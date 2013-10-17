require 'spec_helper'

describe "witnesses/edit" do
  before(:each) do
    @witness = assign(:witness, stub_model(Witness,
      :author => "MyString",
      :title => "MyString",
      :publisher => "MyString",
      :location => "MyString",
      :year => 1
    ))
  end

  it "renders the edit witness form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", witness_path(@witness), "post" do
      assert_select "input#witness_author[name=?]", "witness[author]"
      assert_select "input#witness_title[name=?]", "witness[title]"
      assert_select "input#witness_publisher[name=?]", "witness[publisher]"
      assert_select "input#witness_location[name=?]", "witness[location]"
      assert_select "input#witness_year[name=?]", "witness[year]"
    end
  end
end
