class Milestone < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: :slugged

  def next
    self.class.order("id").find_by("id > ?", self.id)
  end

  def prev
    self.class.order("id").where("id < ?", self.id).last
  end
end
