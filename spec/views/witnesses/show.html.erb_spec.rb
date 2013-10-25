require 'spec_helper'

describe "witnesses/show" do
  before(:each) do
    @witness = FactoryGirl.build(:witness)
  end

  it "renders attributes in <p>" do
    render
    rendered.should have_selector("div.pages")
  end
end
