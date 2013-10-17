require "spec_helper"

describe WitnessesController do
  describe "routing" do

    it "routes to #index" do
      get("/witnesses").should route_to("witnesses#index")
    end

    it "routes to #new" do
      get("/witnesses/new").should route_to("witnesses#new")
    end

    it "routes to #show" do
      get("/witnesses/1").should route_to("witnesses#show", :id => "1")
    end

    it "routes to #edit" do
      get("/witnesses/1/edit").should route_to("witnesses#edit", :id => "1")
    end

    it "routes to #create" do
      post("/witnesses").should route_to("witnesses#create")
    end

    it "routes to #update" do
      put("/witnesses/1").should route_to("witnesses#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/witnesses/1").should route_to("witnesses#destroy", :id => "1")
    end

  end
end
