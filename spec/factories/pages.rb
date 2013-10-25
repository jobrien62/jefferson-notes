# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

  factory :page do
    content Faker::Lorem.paragraphs.to_s
    page_number 1
    notes Faker::Lorem.words(1).to_s
    order Faker::Number.number(0)
    witness
  end
end
