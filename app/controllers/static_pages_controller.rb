class StaticPagesController < ApplicationController
  def home
    @milestones = Milestone.all
  end

  def map
  end
end
