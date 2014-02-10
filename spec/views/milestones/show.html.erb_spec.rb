require 'spec_helper'

describe "milestones/show.html.erb" do

  before(:each) do
    @milestone = FactoryGirl.build(:milestone)
  end


  it "renders attributes in div.milestone" do
    render
    render.should have_selector("div.milestone")
  end
end
