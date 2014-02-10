# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :milestone do
    title Faker::Lorem.words(3).to_s
    content Faker::Lorem.paragraphs.to_s
    order Faker::Number.number(0)
  end
end
