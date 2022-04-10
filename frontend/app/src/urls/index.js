const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api'

export const restaurantsIndex = `${DEFAULT_API_LOCALHOST}/restaurants`
export const foodsIndex = (restaurantId) =>
  `${DEFAULT_API_LOCALHOST}/restaurants/${restaurantId}/foods`
export const preOrders = `${DEFAULT_API_LOCALHOST}/pre_orders`;
export const preOrdersReplace = `${DEFAULT_API_LOCALHOST}/pre_orders/replace`;
export const orders = `${DEFAULT_API_LOCALHOST}/orders`;
