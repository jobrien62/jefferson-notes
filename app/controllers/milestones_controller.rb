class MilestonesController < ApplicationController

  before_action :set_milestone, only: [:show]
  before_action :get_milestones

  def index
    #@milestones = Milestone.all
  end

  def show
     #@milestones = Milestone.all
  end

  private

  def set_milestone
    @milestone = Milestone.friendly.find(params[:id])
  end

  def get_milestones
    @milestones = Milestone.all
  end
end
