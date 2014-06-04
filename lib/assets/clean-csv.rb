#! /usr/bin/env ruby

require 'csv'
require 'faker'

seed_string = "Images.create(["

CSV.foreach('./pages-correlate.csv', :headers => true) do |row|

  stockdale_prefix = "000013068_"
  paris_prefix = "000013143_"
  stockdale_file = row[0].gsub('.tif', '.jpg')
  paris_file = row[2].gsub('.tif', '.jpg')
  page_number = row[1]
  note = row[3]

  #puts "#{stockdale_prefix}#{stockdale_file}"
  #puts "#{paris_prefix}#{paris_file}"
  #
  seed_string += <<EOS

  {
    witness_id: 1,
    filename: "#{stockdale_prefix}#{stockdale_file}"
  },
  {
     witness_id: 1,
    filename:"#{paris_prefix}#{paris_file}"
  }
EOS

  #puts page_number unless ( page_number.nil? or page_number == 'tip-in')
  #puts Faker::Lorem.paragraph
  #row.each do |column|
  #puts column.to_hash
  #end
end

seed_string += "])"
puts seed_string

