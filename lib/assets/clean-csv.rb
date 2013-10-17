#! /usr/bin/env ruby

require 'csv'

CSV.foreach('./pages-correlate.csv', :headers => true) do |row|

  stockdale_prefix = "000013068_"
  paris_prefix = "000013143_"
  stockdale_file = row[0].gsub('.tif', '.jpg')
  puts "#{stockdale_prefix}#{stockdale_file}"

  #row.each do |column|
    #puts column.to_hash
  #end
end
