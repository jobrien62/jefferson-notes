class CreateMilestonesImages < ActiveRecord::Migration
  def change
    create_table :milestones_images do |t|
      t.integer :page_id
      t.string :fedora_pid
      t.string :slug
      t.references :milestones

      t.timestamps
    end
  end
end
