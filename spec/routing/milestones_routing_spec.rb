require "spec_helper"

describe MilestonesController do
  describe "routing" do

    it "routes to #index" do
      get("/milestones").should route_to("milestones#index")
    end

    it "routes to #show" do
      get("/milestones/1").should route_to("milestones#show", :id => "1")
    end

  end
end
