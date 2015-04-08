class StaticPagesController < ApplicationController
  caches_page :home, :map, :about, :credits, :milestones

  def home
    @milestones = Milestone.order(:id).all
  end
end
