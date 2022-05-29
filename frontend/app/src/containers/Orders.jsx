import React, { Fragment, useEffect, useReducer } from 'react';

import { fetchPreOrders } from '../apis/pre_orders';

import {
  initialState,
  preOrdersActionTyps,
  preOrdersReducer,
} from '../reducers/preOrders';

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
