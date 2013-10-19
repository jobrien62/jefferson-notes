require 'nokogiri'
require "awesome_print"

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
end
