require 'spec_helper'

describe ImagesPages do
  it "has a valid factory" do
    FactoryGirl.create(:images_page).should be_valid
  end
end
