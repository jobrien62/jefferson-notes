require 'spec_helper'

describe Witness do

  it "has a valid factory" do
    Factory.create(:witness).should be_valid
  end

end
