# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :images_page, :class => 'ImagesPages' do
    page nil
    image nil
  end
end
