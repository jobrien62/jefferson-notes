require 'rsolr'

class SearchController < ApplicationController

  caches_action :index

  def index
  end

  def results
    solr = RSolr.connect :url => ENV['SOLR_URL']

    guard_search_params(params)

    @response = solr.paginate params[:page], 20, 'select', :params => {
      :q => params[:q],
      :hl => true,
    }
  end

  private

  def guard_search_params(params)
    params[:q] = "*:*" if params[:q] == ''
    params[:q] ||= "*:*"

    params
  end
end
