class StaticPagesController < ApplicationController
  def home
    @milestones = Milestone.all
  end

  def help
  end
end
