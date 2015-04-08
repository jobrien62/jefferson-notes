#!/usr/bin/env ruby

require 'nokogiri'
require "awesome_print"
require "csv"
require "rsolr"
require "titleize"


HTMLFILE='./lib/assets/stockdale1787.final.html'
#HTMLFILE='./lib/assets/queries.html'
CSVFILE='./lib/assets/pages-correlate-no-sync.csv'
FEDORA_PREFIX="http://fedoraproxy.lib.virginia.edu/fedora/objects"

namespace :cache do
  desc "Clears Rails cache"
  task :clear => :environment do
    Rails.cache.clear
  end
end

namespace :import do
  desc "Convenience wrapper for all the tasks"
  task :all => [:milestones, :index]

  desc "Convenience wrapper for resetting the database"
  task :reset => ['db:reset', :milestones]


  def find_pid(page, edition)
    @csv ||= @csv = CSV.read(CSVFILE, headers: true)

    pid_field = "#{edition}_pid"
    page_field = "#{edition}_page"

    pid = ""
    result = {}

    @csv.each do |row|
      if( row[page_field] == page )
        if( row['transcriptions'].nil? )
          transcription_file = nil
        else
          transcription_file = "transcriptions/transcription_#{row['transcriptions']}.html"
        end

        pid = "uva-lib:#{row[pid_field]}"
        result = {"pid" => pid, "transcription_file" => transcription_file}
      end
    end

    result
  end

  desc "Index milestones"
  task :index => :environment do
    doc = parse_data
    solr = RSolr.connect :url => ENV['SOLR_URL']
    documents = Array.new

    doc.xpath('//div[@class="query"]').each do |query|
      slug = query.attribute('id').value
      title = slug.split('-').join(' ').titlecase

      query.xpath('.//*').each do |payload|
        content = payload.text
        id = payload.attribute('id')

        if id.nil?
          ap content
        end

        index_doc = {
          id: payload.attribute('id'),
          slug: slug,
          title: title,
          section: content
        }
        documents.push(index_doc)
      end
    end

    ap "Sending to server"
    solr.add documents
    solr.commit
    solr.optimize

    ap "Done"
  end

  def parse_translation(translation_file)
    file = File.open( "./lib/assets/#{translation_file}" )
    xml = Nokogiri::HTML(file)
    content = xml.css( 'div' )

    fragment = Nokogiri::HTML::DocumentFragment.parse <<-EOHTML
    <div>
      <p><a href="#" class="transcription-trigger">Marginalia</a></p>
      <div class="modal-content transcription-body">
        #{content}
      </div>
    </div>
    EOHTML

    fragment
  end

  def make_link(page, slug)
    pid_1787 = find_pid(page, 1787)
    pid_1784 = find_pid(page, 1784)
    translation = ""

    thumb_1787 = fedora_thumb(pid_1787['pid'])
    full_1787 = fedora_full(pid_1787['pid'])
    thumb_1784 = fedora_thumb(pid_1784['pid'])
    full_1784 = fedora_full(pid_1784['pid'])

    translation = parse_translation(pid_1787['transcription_file']) unless pid_1787['transcription_file'].nil?

    fragment = Nokogiri::HTML::DocumentFragment.parse <<-EOHTML
       <div class="thumbs" id="#{page.to_i}">
       #{translation}
       <a href="#{full_1787}">
        <figure>
          <img alt='1787 Edition' class='thumb lazy' width="89" height="125" data-original='#{thumb_1787}' />
          <figcaption>1787 Edition</figcaption>
        </figure>
       </a>
    #{
    unless pid_1784.empty?
      '<a href="' + full_1784.to_s + '">
        <figure>
          <img alt=''1784 Edition'' class="thumb lazy" width="89" height="125" data-original=' + thumb_1784 +' />
          <figcaption>1784 Edition</figcaption>
        </figure>
       </a>'
    end
    }
      </div>

    EOHTML

    fragment
  end

  desc "Generate Milestones"
  task :milestones => :environment do
    doc = parse_data
    order = 0

    doc.xpath('//div[@class="query"]').each do |query|
      slug = query.attribute('id').value
      title = slug.split('-').join(' ').titlecase
      order += 1

      ap "Adding #{title}..."

      query.xpath('.//span[@class="pagenum"]').each do |page|
        page_id = parse_page(page)

        thumbnails = make_link(page_id, slug)
        page.add_next_sibling(thumbnails)
      end

      content = query.to_html

      Milestone.create(
        title: title,
        slug: slug,
        order: order += 1,
        content: content
      )
    end

    ap "Done"
  end

  desc "Report number of authorNotes"
  task :count_authornotes => :environment do
    source = File.open(HTMLFILE)
    doc = Nokogiri::HTML(source)
    ap doc.search("//span[@class='authorNote']").size
  end

  desc "Report number of paragraphs"
  task :count_paragraphs => :environment do
    source = File.open(HTMLFILE)
    doc = Nokogiri::HTML(source)
    ap doc.search("//table").size
  end

  desc 'Resets on Heroku'
  task :heroku_reset => :environment do
    sh "heroku pg:reset DATABASE --confirm jefferson-notes"
    `heroku run rake db:migrate`
    `heroku run rake import:milestones`
    `heroku run rake cache:clear`
  end

  def parse_data
    source = File.open(HTMLFILE)
    Nokogiri::XML(source)
  end

  def fedora_thumb(pid)
    "#{FEDORA_PREFIX}/#{pid}/methods/djatoka:StaticSDef/getThumbnail"
  end

  def fedora_full(pid)
    "#{FEDORA_PREFIX}/#{pid}/methods/djatoka:StaticSDef/getStaticImage"
  end

  def parse_page(page_element)
    page_element.attribute('id').to_s.gsub("page-", '')
  end

  def construct_filename(prefix, file)
    "#{prefix}#{file}".gsub('.tif', '.jpg')
  end
end
