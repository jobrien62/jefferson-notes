# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :milestone do
    title "MyString"
    slug "MyString"
    content "MyText"
    order 1
  end
end
