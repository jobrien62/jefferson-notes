class CreateImagesPages < ActiveRecord::Migration
  def change
    create_table :images_pages do |t|
      t.references :page, index: true
      t.references :image, index: true

      t.timestamps
    end
  end
end
