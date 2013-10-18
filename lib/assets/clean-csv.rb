#! /usr/bin/env ruby

require 'csv'
require 'faker'

CSV.foreach('./pages-correlate.csv', :headers => true) do |row|

  stockdale_prefix = "000013068_"
  paris_prefix = "000013143_"
  stockdale_file = row[0].gsub('.tif', '.jpg')
  page_number = row[1]
  note = row[3]
  #puts "#{stockdale_prefix}#{stockdale_file}"
  puts page_number unless ( page_number.nil? or page_number == 'tip-in')
  puts Faker::Lorem.paragraph
  #row.each do |column|
    #puts column.to_hash
  #end
end
