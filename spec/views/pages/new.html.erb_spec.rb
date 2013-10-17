require 'spec_helper'

describe "pages/new" do
  before(:each) do
    assign(:page, stub_model(Page,
      :content => "MyText",
      :page_number => 1,
      :notes => "MyText"
    ).as_new_record)
  end

  it "renders new page form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", pages_path, "post" do
      assert_select "textarea#page_content[name=?]", "page[content]"
      assert_select "input#page_page_number[name=?]", "page[page_number]"
      assert_select "textarea#page_notes[name=?]", "page[notes]"
    end
  end
end
