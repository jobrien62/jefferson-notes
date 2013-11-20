class PagesImages < ActiveRecord::Migration
  def change
    create_table :page_images do |table|
      table.belongs_to :page
      table.belongs_to :image
    end
  end
end
