class Order < ApplicationRecord
  has_many :pre_orders

  validates :total_price, numericality: { greater_than: 0 }

  def save_with_update_pre_orders!(pre_orders)
    ActiveRecord::Base.transaction do
      pre_orders.each do |pre_order|
        pre_order.update_attributes!(active: false, order: self)
      end
      self.save!
    end
  end
end
