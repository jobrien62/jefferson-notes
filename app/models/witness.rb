class Witness < ActiveRecord::Base
  extend FriendlyId
  friendly_id :publisher, use: :slugged
end
