class Milestone < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: :slugged
  has_paper_trail

  after_update :clear_cache

  def next
    self.class.order("id").where("id > ?", self.id).first
  end

  def prev
    self.class.order("id").where("id < ?", self.id).last
  end

  def clear_cache
    ActionController::Base.expire_page("/#{self.slug}")
  end
end
