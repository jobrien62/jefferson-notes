require 'nokogiri'
require "awesome_print"
require "csv"

namespace :import do
  desc "Map the HTML file to the schema"
  task :docs => :environment do
    source = File.open("./lib/assets/stockdale_processed.html")
    doc = Nokogiri::HTML(source)

    order = 0

    ap "Adding pages..."
    doc.css('div[@class="page"]').each do |page|
      order += 1
      page_no = page.attribute('id').value.to_i
      notes = page.attribute('id').to_str

      Page.create(
        content: page.to_html(encoding:'US-ASCII'),
        page_number: page_no,
        witness_id: 1,
        #slug: page.attribute('id').to_str,
        order: order,
        notes: notes
      )
    end

  end

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
        ap paris_image

        pageImages = PageImage.create([
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
