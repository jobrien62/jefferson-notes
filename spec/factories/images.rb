# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :image do
    filename Faker::Lorem.word.to_s
    pid "foobar:12345"
  end
end
