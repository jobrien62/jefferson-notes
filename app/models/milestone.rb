class Milestone < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: :slugged

  has_many :milestones_images

  def next
    self.class.order("id").where("id > ?", self.id).first
  end

  def prev
    self.class.order("id").where("id < ?", self.id).last
  end
end
