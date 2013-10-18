class StaticPagesController < ApplicationController
  def home
    @witness = Witness.first
  end

  def help
  end
end
