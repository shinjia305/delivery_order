module Api
  class OrdersController < ApplicationController
    def create
      posted_pre_orders = PreOrder.where(id: params[:pre_order_ids])
      order = Order.new(
        total_price: total_price(posted_pre_orders),
      )
      if order.save_with_update_pre_orders!(posted_pre_orders)
        render json: {}, status: :no_content
      else
        render json: {}, status: :internal_server_error
      end
    end

    private

    def total_price(posted_pre_orders)
      posted_pre_orders.sum {|pre_order| pre_order.total_amount } + posted_pre_orders.first.restaurant.fee
    end
  end
end
