require 'nokogiri'
require "awesome_print"

class Stockdale < Nokogiri::XML::SAX::Document
  def start_element name, attrs = []
    ap "starting: #{name}"
  end

  def characters string
    
  end

  def end_element name
    ap "edning #{name}"
  end
end

namespace :import do
  desc "Map the HTML file to the schema"
  task :doc => :environment do
    source = File.open("./lib/assets/stockdale_processed.html")
    doc = Nokogiri::HTML(source)

    ap "Adding pages..."
    doc.css('div[@class="page"]').each do |page|
      Page.create(
        content: page.to_html,
        page_number: page.attribute('id').value.to_i,
        witness_id: 1
      )
    end

  end
end
