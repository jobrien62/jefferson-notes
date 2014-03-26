# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :milestones_image, :class => 'MilestonesImages' do
    page_id 1
    fedora_pid "MyString"
    references ""
  end
end
