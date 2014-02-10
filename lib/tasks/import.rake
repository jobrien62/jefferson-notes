require 'nokogiri'
require "awesome_print"
require "csv"
require "rsolr"

namespace :import do

  desc "Convenience wrapper for all the tasks"
  task :all => [:docs, :images, :page_images]

  desc "Convenience wrapper for resetting the database"
  task :reset => ['db:reset', :milestones]

  def mapPageToPids(page)
    pids = {}
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

      query.xpath('//p|div').each do |payload|
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

  desc "Generate Milestones"
  task :milestones => :environment do
    doc = parse_data

    order = 0

    doc.xpath('//div[@class="query"]').each do |query|
      slug = query.attribute('id').value
      title = slug.split('-').join(' ').titleize
      content = query.to_html()
      order += 1

      ap "Adding #{title}..."

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
