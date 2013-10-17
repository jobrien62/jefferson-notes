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
    source = File.open("./lib/assets/stockdale_1787.html")
    parser = Nokogiri::XML::SAX::Parser.new(Stockdale.new)
  
    doc = parser.parse(source)
    #ap doc

  end
end
