require 'spec_helper'

describe "search/index.html.erb" do
  it "renders a earch form" do
    render
    render.should have_selector("form")
  end
end
