class Image < ActiveRecord::Base
  belongs_to :witness

  has_and_belongs_to_many :pages
end
