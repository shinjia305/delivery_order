class Restaurant < ApplicationRecord
  has_many :foods
  has_many :pre_orders, through: :foods

  validates :name, :fee, :time_required, presence: true
  validates :name, length: { maximum: 30 }
  validates :fee, numericality: { greater_than: 0 }
end
