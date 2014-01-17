class Milestone < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: :slugged

  def next
    self.class.order("id").where("id > ?", self.id).first
    #self.where("id > ?", id).order("id ASC").first
  end

  def prev
    #self.class.order("id", id).order("id DESC").first
    self.class.order("id").where("id < ?", self.id).first
  end
end
