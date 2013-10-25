class WitnessesController < ApplicationController
  before_action :set_witness, only: [:show]

  # GET /witnesses
  # GET /witnesses.json
  def index
    #@witnesses = Witness.all
    @witness = Witness.first
  end

  # GET /witnesses/1
  # GET /witnesses/1.json
  def show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_witness
      @witness = Witness.friendly.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def witness_params
      params.require(:witness).permit(:author, :title, :publisher, :location, :year, :slug)
    end
end
