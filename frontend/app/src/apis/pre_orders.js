import axios from 'axios';
import { preOrders, preOrdersReplace } from '../urls/index';

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

export const replacePreOrders = (params) => {
  return axios.put(preOrdersReplace,
    {
      food_id: params.foodId,
      count: params.count,
    }
  )
  .then(res => {
    return res.data
  })
  .catch((e) => { throw e; })
};

export const fetchPreOrders = () => {
  return axios.get(preOrders)
  .then(res => {
    return res.data
  })
  .catch((e) => { throw e; })
};
