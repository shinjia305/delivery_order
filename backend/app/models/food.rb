class Food < ApplicationRecord
  belongs_to :restaurant
  belongs_to :order, optional: true
  has_one :pre_order
end
