class StaticPagesController < ApplicationController

  caches_page :home, :map

  def home
    @milestones = Milestone.order(:id).all
  end

  def map
  end
end
