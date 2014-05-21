require 'nokogiri'
require "awesome_print"
require "csv"
require "rsolr"

namespace :import do

  FEDORA_PREFIX="http://fedoraproxy.lib.virginia.edu/fedora/objects"

  def fedora_thumb(pid)
    "#{FEDORA_PREFIX}/#{pid}/methods/djatoka:StaticSDef/getThumbnail"
  end

  def fedora_full(pid)
    "#{FEDORA_PREFIX}/#{pid}/methods/djatoka:StaticSDef/getStaticImage"
  end

  desc "Convenience wrapper for all the tasks"
  task :all => [:docs, :images, :page_images]

  desc "Convenience wrapper for resetting the database"
  task :reset => ['db:reset', :milestones]

  def mapPageToPids(page)
    pids = {}
  end

  def find_pid(page, edition)
    @csv ||= @csv = CSV.read('./lib/assets/pages-correlate-no-sync.csv', headers: true)

    pid_field = "#{edition}_pid"
    page_field = "#{edition}_page"

    pid = ""

    @csv.each do |row|
      if( row[page_field] == page )
        pid = "uva-lib:#{row[pid_field]}"
        puts pid
      end
      #puts row["1787_page"].class
    end

    pid

  end

  def parse_data
    source = File.open('./lib/assets/queries.html')
    Nokogiri::XML(source)
  end

  desc "Index milestones"
  task :index => :environment do
    doc = parse_data
    solr = RSolr.connect :url => ENV['SOLR_URL']
    documents = Array.new

    doc.xpath('//div[@class="query"]').each do |query|
      slug = query.attribute('id').value
      title = slug.split('-').join(' ').titleize

      query.xpath('//p|div|table').each do |payload|
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

  def make_link(page, slug)

    pid_1787 = find_pid(page, 1787)
    pid_1784 = find_pid(page, 1784)

    #pid_1787 = "uva-lib:" + (763482 + page.to_i).to_s
    #pid_1784 = "uva-lib:" + (1195298 + page.to_i).to_s

    thumb_1787 = fedora_thumb(pid_1787)
    full_1787 = fedora_full(pid_1787)
    thumb_1784 = fedora_thumb(pid_1784)
    full_1784 = fedora_full(pid_1784)

    #ap "#{slug}, #{pid_1787}, #{page.to_i}"

    MilestonesImages.create(
      page_id: page.to_i,
      slug: slug,
      fedora_pid: pid_1787
    )

    fragment = Nokogiri::HTML::DocumentFragment.parse <<-EOHTML
       <div class="thumbs" id="#{page.to_i}">
       <a href="#{full_1787}">
        <figure>
          <img alt='1787 Edition' class='thumb lazy' width="89" height="125" data-original='#{thumb_1787}' />
          <figcaption>1787 Edition</figcaption>
        </figure>
       </a>
       <a href="#{full_1784}">
        <figure>
          <img alt='1784 Edition' class="thumb lazy" width="89" height="125" data-original='#{thumb_1784}' />
          <figcaption>1784 Edition</figcaption>
        </figure>
       </a>
      </div>
    EOHTML

    fragment

  end

  def parse_page(page_element)
    page_element.attribute('id').value.scan(/\d+/).join
  end


  desc "Generate Milestones"
  task :milestones => :environment do
    doc = parse_data
    #csv = CSV.read './lib/assets/pages-correlate-no-sync.csv'
    #csv_text = source = File.open("./lib/assets/pages-correlate-no-sync.csv")
    #csv = CSV.parse(csv_text, :headers => true)
    order = 0

    #doc.xpath('//div[@class="query"]').each do |query|
    doc.xpath('//div[@class="query"]').each do |query|
      slug = query.attribute('id').value
      title = slug.split('-').join(' ').titleize
      #content = query.to_html()
      order += 1

      ap "Adding #{title}..."

      query.xpath('.//span[@class="pagenum"]').each do |page|

        #page_id = page.attribute('id').value.scan(/\d+/).join
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
    source = File.open('./lib/assets/queries.html')
    doc = Nokogiri::HTML(source)
    ap doc.search("//span[@class='authorNote']").size
  end

  desc "Report number of paragraphs"
  task :count_paragraphs => :environment do
    source = File.open('./lib/assets/queries.html')
    doc = Nokogiri::HTML(source)
    ap doc.search("//table").size
  end

  #desc "Prepare queries for database"
  #task :queries => :environment do
  #source = File.open('./lib/assets/queries.html')
  #doc = Nokogiri::HTML(source)

  #order = 0

  #doc.css('div[@class="query"]').each do |query|
  #order += 1

  #slug = query.attribute('id').value
  #title = slug.split('-').join(' ').titleize
  #content = query.to_html(encoding: 'US-ASCII')

  #query.css('[@class="pagenum"]').each do |page|
  #page = page.attribute('id').value

  #pids = mapPageToPids(page)
  #end

  ##Milestone.create(
  ##order: order,
  ##content: content,
  ##title: title,
  ##slug: slug
  ##)

  #ap "Created #{title}"
  #end

  #end

  def construct_filename(prefix, file)
    "#{prefix}#{file}".gsub('.tif', '.jpg')
  end

  desc "Contruct Page Associations"
  task :page_images => :environment do
    source = File.open("./lib/assets/pages-correlate.csv")

    ap "Associating Pages and pids"

    CSV.foreach(source, :headers => true) do |row|
      slug = row[6]
      #ap slug unless slug.nil?

      stockdale_pid = "uva-lib:#{row[1]}"
      paris_pid = "uva-lib:#{row[5]}"

      page = Page.find_by_slug(slug)

      unless page.nil?
        stockdale_image = Image.find_by_pid(stockdale_pid)
        paris_image = Image.find_by_pid(paris_pid)

        ap "Associating #{page.slug} with #{stockdale_image.pid} and #{paris_image.pid}"

        pageImage = ImagesPages.create([
          {
            page_id: page.id,
            image_id: stockdale_image.id
          },
          {
            page_id: page.id,
            image_id: paris_image.id
          }

        ])
      end

      #ap stockdale_pid

    end

  end

  desc "Import page image references"
  task :images => :environment do
    source = File.open("./lib/assets/pages-correlate.csv")

    STOCKDALE_PREFIX = "000013068_"
    PARIS_PREFIX = "000013143_"

    CSV.foreach(source, :headers => true) do |row|
      stockdale_image = construct_filename(STOCKDALE_PREFIX, row[0])
      paris_image = construct_filename(STOCKDALE_PREFIX, row[3])

      stockdale = Witness.find_by_slug('stockdale')
      paris = Witness.find_by_slug('paris')

      stockdale_pid = "uva-lib:#{row[1]}"
      paris_pid = "uva-lib:#{row[5]}"

      ap "Adding pids: #{paris_pid} and #{stockdale_pid}"

      pages = Image.create([
        {
          witness_id: stockdale.id,
          filename: stockdale_image,
          pid: stockdale_pid
        },
        {
          witness_id: paris.id,
          filename: paris_image,
          pid: paris_pid
        },
      ])

    end
  end

end
