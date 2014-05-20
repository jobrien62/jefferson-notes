# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :milestones_image, :class => 'MilestonesImages' do
    milestone_id = 1
    image_id = 1
    page_id = Random.rand(1..200)
    fedora_pid "pid:#{Random.rand(1000..10000)}"
    slug Faker::Lorem.word
  end
end
