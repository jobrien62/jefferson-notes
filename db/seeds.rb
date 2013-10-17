# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

witnesses = Witness.create([
  {
    author: "Jefferson, Thomas, et al.",
    title: "Notes On the State of Virginia",
    publisher: "Printed for John Stockdale, opposite Burlington-house, Piccadilly",
    location: "London",
    year: 1787,
    slug: 'stockdale'
  },
  {
    author: "Jefferson, Thomas, et al.",
    title: "Notes On the State of Virginia",
    publisher: "",
    location: "Paris",
    year: 1785,
    slug: 'paris'
  }
])
