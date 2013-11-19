class StaticPagesController < ApplicationController
  def home
    @witness = Witness.first

    @images = Image.where(witness_id: @witness.id).limit(20).offset(6)
  end

  def help
  end
end
