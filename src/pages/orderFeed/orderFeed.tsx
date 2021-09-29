import React, { useEffect, useMemo } from 'react';
import styles from './orderFeed.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderFeed } from '../../services/actions';
import { RootState } from '../../services/store';

export function OrderFeed() {
  const dispatch = useDispatch();

  const { orderFeed } = useSelector((state: RootState) => ({ ...state }));
  const hasOrders = useMemo(() => orderFeed.length > 0, [orderFeed]);

  useEffect(() => {
    dispatch(updateOrderFeed());
  }, [dispatch]);

  return (
    <div className={`text ${styles.main}`}>
      <h1 className='text_type_main-medium'>Лента заказов</h1>
      {hasOrders ? (
        orderFeed.map(order => (
          <div key={order._id}>{order.number}. {order.name}</div>
        ))
      ) : (
        <div className='text text_type_main-small text_color_inactive'>Вы пока ничего не заказали</div>
      )}
    </div>
  );
}