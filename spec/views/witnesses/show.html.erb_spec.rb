require 'spec_helper'

describe "witnesses/show" do
  before(:each) do
    @witness = assign(:witness, stub_model(Witness,
      :author => "Author",
      :title => "Title",
      :publisher => "Publisher",
      :location => "Location",
      :year => 1
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Author/)
    rendered.should match(/Title/)
    rendered.should match(/Publisher/)
    rendered.should match(/Location/)
    rendered.should match(/1/)
  end
end
