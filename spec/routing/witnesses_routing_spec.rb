require "spec_helper"

describe WitnessesController do
  describe "routing" do

    it "routes to #index" do
      get("/witnesses").should route_to("witnesses#index")
    end

    it "routes to #show" do
      get("/witnesses/1").should route_to("witnesses#show", :id => "1")
    end

  end
end
