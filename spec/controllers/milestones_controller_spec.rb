require 'spec_helper'

describe MilestonesController do


  describe "GET 'index'" do
    it "returns http success" do
      get 'index'
      response.should be_success
    end
  end

  describe "GET 'show'" do
    it "returns http success" do
      milestone = create(:milestone)

      get 'show', id: milestone
      response.should be_success
    end

    it "renders the #show view" do
      get :show, id: create(:milestone)
      response.should render_template :show
    end
  end

end
