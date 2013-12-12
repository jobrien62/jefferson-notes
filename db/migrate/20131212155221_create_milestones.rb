class CreateMilestones < ActiveRecord::Migration
  def change
    create_table :milestones do |t|
      t.string :title
      t.string :slug
      t.text :content
      t.integer :order

      t.timestamps
    end
  end
end
