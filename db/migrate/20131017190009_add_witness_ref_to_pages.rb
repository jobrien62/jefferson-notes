class AddWitnessRefToPages < ActiveRecord::Migration
  def change
    add_reference :pages, :witness, index: true
  end
end
