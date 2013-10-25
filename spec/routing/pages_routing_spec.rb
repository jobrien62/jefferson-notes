require "spec_helper"

describe PagesController do
  describe "routing" do

    before(:each) do
      @witness = FactoryGirl.build(:witness)
    end

    it "routes to #index" do
      get("/witnesses/test/pages").should route_to("pages#index", :witness_id => 'test')
    end

    it "routes to #show" do
      get("/witnesses/test/pages/1").should route_to("pages#show", :witness_id => 'test',  :id => "1")
    end
  end
end
