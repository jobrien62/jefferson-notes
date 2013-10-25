require 'spec_helper'

describe Witness do

  before(:each) do
    @witness = FactoryGirl.build(:witness)
  end

  it "has a valid factory" do
    @witness.should be_valid
  end

  describe "#citation" do
    it "returns a string citation" do
      @witness.citation.should have_at_least(4).words
    end
  end
end
