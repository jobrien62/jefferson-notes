class MilestonesController < ApplicationController
  before_action :set_milestone, only: [:show]
  before_action :get_milestones

  caches_action :index
  caches_action :show

  def index
  end

  def show
  end

  private

  def set_milestone
    @milestone = Milestone.friendly.find(params[:id])
  end

  def get_milestones
    @milestones = Milestone.all
  end
end
