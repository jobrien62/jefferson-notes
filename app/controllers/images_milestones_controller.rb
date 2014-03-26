class ImagesMilestonesController < ApplicationController
  def index
    @images = MilestonesImages.all
  end
end
