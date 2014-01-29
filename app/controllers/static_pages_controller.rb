class StaticPagesController < ApplicationController
  def home
    @page = Page.first
    @milestones = Milestone.all
    #@witness = Witness.first
    #@pages = @witness.pages
    #@images = Image.where(witness_id: @witness.id).limit(20).offset(6)
  end

  def help
  end
end
