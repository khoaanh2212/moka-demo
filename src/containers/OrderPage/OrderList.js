import React from 'react';
import PropTypes from 'prop-types';
import OrderItem from './OrderItem';

const OrderList = ({ orders }) => (
  <div>
		Order List
	</div>
);

OrderList.defaultProps = {
  orders: [],
};
OrderList.propTypes = {
  orders: PropTypes.array,
};
export default OrderList;
