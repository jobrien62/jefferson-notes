class CreateWitnesses < ActiveRecord::Migration
  def change
    create_table :witnesses do |t|
      t.string :author
      t.string :title
      t.string :publisher
      t.string :location
      t.integer :year

      t.timestamps
    end
  end
end
