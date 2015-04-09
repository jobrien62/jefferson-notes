require 'spec_helper'

describe SearchController do

  describe "GET 'index'" do
    it "returns http success" do
      get :index
      expect(response).to render_template('index')
    end
  end

  describe "GET 'results'" do
    it "returns http success" do
      #get :results
      #expect(response).to render_template('results')
    end
  end

end
