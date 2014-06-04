class AddIndexToMilestoneImages < ActiveRecord::Migration
  def change
    add_index :milestones_images, :milestones_id
  end
end
