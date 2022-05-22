import axios from 'axios';
import { preOrders } from '../urls/index';

export const postPreOrders = (params) => {
  return axios.post(preOrders,
    {
      food_id: params.foodId,
      count: params.count,
    }
  )
  .then(res => {
    return res.data
  })
  .catch((e) => { throw e;})
}
