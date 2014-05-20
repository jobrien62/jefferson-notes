require 'spec_helper'

describe MilestonesImages do
  it "has a valid factory" do
    FactoryGirl.create(:milestones_image).should be_valid
  end
end
