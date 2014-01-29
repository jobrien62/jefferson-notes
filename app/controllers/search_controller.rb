require 'rsolr'

class SearchController < ApplicationController
  def index

  end

  def results
    solr = RSolr.connect :url => ENV['SOLR_URL']
    @response = solr.get 'select', :params => {
      :q=>params[:q]
    }
  end
end
