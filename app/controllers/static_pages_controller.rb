class StaticPagesController < ApplicationController

  caches_action :home, :map

  def home
    @milestones = Milestone.order(:id).all
  end

  def map
  end
end
