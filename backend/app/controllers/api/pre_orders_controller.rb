module Api
  class PreOrdersController < ApplicationController
    before_action :set_food, only: %i[create replace]

    def index
      pre_orders = PreOrder.active
      if pre_orders.exists?
        render json: {
          pre_order_ids: pre_orders.map { |pre_order| pre_order.id },
          restaurant: pre_orders[0].restaurant,
          count: pre_orders.sum { |pre_order| pre_order[:count] },
          amount: pre_orders.sum { |pre_order| pre_order.total_amount },
        }, status: :ok
      else
        render json: {}, status: :no_content
      end
    end

    def create
      if PreOrder.active.other_restaurant(@ordered_food.restaurant.id).exists?
        return render json: {
          existing_restaurant: PreOrder.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name,
          new_restaurant: Food.find(params[:food_id]).restaurant.name,
        }, status: :not_acceptable
      end

      set_pre_order(@ordered_food)

      if @pre_order.save
        render json: {
          pre_order: @pre_order
        }, status: :created
      else
        render json: {}, status: :internal_server_error
      end
    end

    def replace
      PreOrder.active.other_restaurant(@ordered_food.restaurant.id).each do |pre_order|
        pre_order.update_attribute(:active, false)
      end

      set_pre_order(@ordered_food)

      if @pre_order.save
        render json: {
          pre_order: @pre_order
        }, status: :created
      else
        render json: {}, status: :internal_server_error
      end
    end

    private

    def set_food
      @ordered_food = Food.find(params[:food_id])
    end

    def set_pre_order(ordered_food)
      if ordered_food.pre_order.present?
        @pre_order = ordered_food.pre_order
        @pre_order.attributes = {
          count: ordered_food.pre_order.count + params[:count],
          active: true
        }
      else
        @pre_order = ordered_food.build_pre_order(
          count: params[:count],
          restaurant: ordered_food.restaurant,
          active: true
        )
      end
    end
  end
end
