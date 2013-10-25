require 'spec_helper'

describe "pages/index" do
  before(:each) do
    assign(:pages, [
      stub_model(Page,
        :content => "MyText",
        :page_number => 1,
        :notes => "MyText"
      ),
      stub_model(Page,
        :content => "MyText",
        :page_number => 1,
        :notes => "MyText"
      )
    ])
  end


end
