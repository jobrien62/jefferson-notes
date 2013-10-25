require 'spec_helper'

describe Page do
  it "has a valid factory" do
    FactoryGirl.create(:page).should be_valid
  end

end
