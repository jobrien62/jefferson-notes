class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :filename
      t.string :pid
      t.references :witness, index: true

      t.timestamps
    end
  end
end
