require 'spec_helper'

describe Page do

  before(:each) do
    @pages = FactoryGirl.create_list(:page, 25)
  end

  it "has a valid factory" do
    FactoryGirl.create(:page).should be_valid
  end

  describe "#next" do

    it "has a next page" do
      @pages.first.next.should be(@pages.first[1])
    end

  end

  describe "#prev" do
    it "has a previous page" do
      @pages.last.prev.should be(@pages.last[-1])
    end
  end

end
