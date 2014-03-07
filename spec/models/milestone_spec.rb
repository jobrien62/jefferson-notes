require 'spec_helper'

describe Milestone do
  it "has a valid factory" do
    FactoryGirl.create(:milestone).should be_valid
  end
end
