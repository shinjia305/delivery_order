import React from 'react';
import { DialogContent, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import styled from 'styled-components';

import { SubText } from './StyledText';
import OrderHeaderImage from '../images/order-header.png'

const OrderHeader = styled.img`
  width: 100%
  height: 350px
`;

const DescriptionWrapper = styled.div`
  paddig: 0 8px 8px 8px;
  height: 50px
`;

export const FoodOrderDialog = ({
  food,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog
     open={isOpen}
     onClose={onClose}
    >
      <OrderHeader src={OrderHeaderImage} alt='order header'/>
      <DialogTitle>
        {food.name}
      </DialogTitle>
      <DialogContent>
        <DescriptionWrapper>
          <SubText>
            {food.description}
          </SubText>
        </DescriptionWrapper>
      </DialogContent>
      <DialogActions>
        //　数量操作
      </DialogActions>
    </Dialog>
  )
}