class Witness < ActiveRecord::Base
  extend FriendlyId
  friendly_id :publisher, use: :slugged

  has_many :pages

  accepts_nested_attributes_for :pages
end
