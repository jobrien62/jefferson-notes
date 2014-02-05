require 'rsolr'

class SearchController < ApplicationController
  def index

  end

  def results
    solr = RSolr.connect :url => ENV['SOLR_URL']

    @response = solr.paginate params[:page], 20, 'select', :params => {
      :q => params[:q],
      :hl => true,
    }
  end
end
