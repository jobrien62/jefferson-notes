require 'spec_helper'

describe "pages/edit" do
  before(:each) do
    @page = assign(:page, stub_model(Page,
      :content => "MyText",
      :page_number => 1,
      :notes => "MyText"
    ))
  end

  it "renders the edit page form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", page_path(@page), "post" do
      assert_select "textarea#page_content[name=?]", "page[content]"
      assert_select "input#page_page_number[name=?]", "page[page_number]"
      assert_select "textarea#page_notes[name=?]", "page[notes]"
    end
  end
end
