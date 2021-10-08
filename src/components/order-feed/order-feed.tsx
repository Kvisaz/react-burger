import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styles from './order-feed.module.css';
import { updateOrderFeedFromHttp } from '../../services/actions';
import { OrderFeedItem } from '../order-feed-item/order-feed-item';
import PropTypes from 'prop-types';
import { useMainState } from '../../services/hooks/useMainState';

export interface IOrderFeedProps {
  withStatus?: boolean
}

OrderFeed.propTypes = {
  withStatus: PropTypes.bool
}

export function OrderFeed({withStatus}: IOrderFeedProps) {
  const dispatch = useDispatch();

  const { orderFeed } = useMainState();
  const hasOrders = useMemo(() => orderFeed.length > 0, [orderFeed]);

  useEffect(() => {
    dispatch(updateOrderFeedFromHttp());
  }, [dispatch]);

  return (
    <>
      {hasOrders ? (
        <div className={styles.list}>
          {orderFeed.map(order => (
            <OrderFeedItem key={order.id} withStatus={withStatus} {...order} />
          ))}
        </div>
      ) : (
        <div className='text text_type_main-small text_color_inactive'>Вы пока ничего не заказали</div>
      )}
    </>
  );
}