require 'spec_helper'

describe "milestones/index.html.erb" do

  before(:each) do
    @milestones = build_list(:milestone, 20)
  end

  it "renders attributes in div.milestones" do
    render
    render.should have_selector("ul.milestones")
  end
end
