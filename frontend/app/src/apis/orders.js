import axios from "axios";
import { orders } from '../urls/index';

export const postOrder = (params) => {
  return axios.post(orders,
    {
      pre_order_ids: params.pre_order_ids
    },
  )
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
