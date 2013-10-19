class Page < ActiveRecord::Base
  extend FriendlyId
  friendly_id :notes, use: :slugged

  belongs_to :witness

  def next
    witness.pages.where("id > ?", id).order("id ASC").first
  end

  def prev
    witness.pages.where("id < ?", id).order("id DESC").first
  end
end
