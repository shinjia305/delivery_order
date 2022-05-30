import React, { Fragment, useEffect, useReducer } from 'react';

import { fetchPreOrders } from '../apis/pre_orders';
import { postOrder } from '../apis/orders';

import {
  initialState,
  preOrdersActionTyps,
  preOrdersReducer,
} from '../reducers/preOrders';

const postPreOrders = () => {
  dispatch({ type: preOrdersActionTyps.POSTING });
  postOrder({
    pre_order_ids: state.preOrdersSummary.pre_order_ids,
  }).then(() => {
    dispatch({ type: preOrdersActionTyps.POST_SUCCESS});
    window.location.reload();
  });
};

export const Orders = () => {
  const [state, dispatch] = useReducer(preOrdersReducer, initialState);
  useEffect(() => {
    dispatch({ type: preOrdersActionTyps.FETCHING });
    fetchPreOrders()
    .then((data) => 
      dispatch({
        type: preOrdersActionTyps.FETCH_SUCCESS,
        payload: {
          preOrdersSummary: data
        }
      })
    )
    .catch((e) => console.error(e));
  },[]);

  return (
    <Fragment>
      注文画面
    </Fragment>
  )
}
