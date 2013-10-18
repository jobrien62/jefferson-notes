class Page < ActiveRecord::Base
  extend FriendlyId
  friendly_id :notes, use: :slugged

  belongs_to :witness
end
