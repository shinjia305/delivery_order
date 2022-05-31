import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { LocalMallIcon, QueryBuilderIcon } from './Icons';

import { FONT_SIZE } from '../style_constants';

const LineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AmountText = styled.p`
  font-size: ${ FONT_SIZE.STAND_BODY };
  font-weight: bold;
`;

//　ダイアログの実装
