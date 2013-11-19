# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :image do
    filename "foo"
    pid "foobar:12345"
    witness nil
  end
end
