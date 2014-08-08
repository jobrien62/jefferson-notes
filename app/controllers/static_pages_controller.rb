class StaticPagesController < ApplicationController

  caches_action :home, :map

  def home
    @milestones = Milestone.all
  end

  def map
  end
end
