require 'spec_helper'

describe "witnesses/index" do
  before(:each) do
     @witness = FactoryGirl.build(:witness)
     @page = FactoryGirl.build(:page)
  end

  it "renders only one witness" do
    render
    rendered.should match(/Witnesses/)
  end

end
