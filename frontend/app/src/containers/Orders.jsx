import React, { Fragment, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import { OrderDetailItem } from '../components/OrderDetailItem';
import { OrderButton } from '../components/Buttons/OrderButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchPreOrders } from '../apis/pre_orders';
import { postOrder } from '../apis/orders';

import {
  initialState,
  preOrdersActionTyps,
  preOrdersReducer,
} from '../reducers/preOrders';

import MainLogo from '../images/logo.png';
import { REQUEST_STATE } from '../constants';

const HeaderWrapper = styled.img`
  height: 90px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const OrderListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const OrderItemWrapper = styled.div`
  margin-bottom: 50px;
`

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

  const postPreOrders = () => {
    dispatch({ type: preOrdersActionTyps.POSTING });
    postOrder({
      pre_order_ids: state.preOrdersSummary.pre_order_ids,
    }).then(() => {
      dispatch({ type: preOrdersActionTyps.POST_SUCCESS});
      window.location.reload();
    });
  };

  const orderButtonLabel = () => {
    switch (state.postState) {
      case REQUEST_STATE.LOADING:
        return '注文中...';
      case REQUEST_STATE.OK:
        return '注文が完了しました!';
      default:
        return '注文を確定する';
    }
  };

  return (
    <Fragment>
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo"></MainLogoImage>
        </Link>
      </HeaderWrapper>
      <OrderListWrapper>
        <div>
          <OrderItemWrapper>
            {
              state.fetchState === REQUEST_STATE.LOADING ?
              <CircularProgress/>
              :
              state.preOrdersSummary &&
              <OrderDetailItem
                restaurantFee={state.preOrdersSummary.restaurant.fee}
                restaurantName={state.preOrdersSummary.restaurant.name}
                restaurantId={state.preOrdersSummary.restaurant.id}
                timeRequired={state.preOrdersSummary.restaurant.time_required}
                foodCount={state.preOrdersSummary.count}
                price={state.preOrdersSummary.amount}
              />
            }
          </OrderItemWrapper>
          <div>
            {
              state.fetchState === REQUEST_STATE.OK && state.preOrdersSummary &&
              <OrderButton
                onClick={() => postPreOrders()}
                disabled={state.postState === REQUEST_STATE.LOADING || state.postState === REQUEST_STATE.OK}
              >
                {orderButtonLabel()}
              </OrderButton>
            }
            {
              state.fetchState === REQUEST_STATE.OK && !(state.preOrdersSummary) &&
              <p>注文予定の商品はありません。</p>
            }
          </div>
        </div>
      </OrderListWrapper>
    </Fragment>
  )
}
