class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.text :content
      t.integer :page_number
      t.text :notes

      t.timestamps
    end
  end
end
