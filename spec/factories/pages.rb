# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :page do
    content "MyText"
    page_number 1
    notes "MyText"
  end
end
