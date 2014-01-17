class MilestonesController < ApplicationController
  
  before_action :set_milestone, only: [:show]
  def index
    @milestones = Milestone.all
  end

  def show
    
  end
  
  private

  def set_milestone
    @milestone = Milestone.friendly.find(params[:id])
  end
end
