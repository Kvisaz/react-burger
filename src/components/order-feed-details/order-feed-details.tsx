import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styles from './order-feed-details.module.css';
import { IOrderDetailsUrlParams } from '../../services/Routes';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { MoneyCounter } from '../common/money-counter/money-counter';
import { OrderData } from '../order-data/order-data';
import { OrderFeedDetailsPartList } from './components/order-feed-details-part-list/order-feed-details-part-list';
import { OrderFeedItemStatus } from '../order-feed-item-status/order-feed-item-status';
import { formatOrderNumber } from '../../services/converters/formatOrderNumber';

export function OrderFeedDetails() {
  const { id } = useParams<IOrderDetailsUrlParams>();
  const { orderFeed } = useSelector((state: RootState) => ({ ...state }));
  const order = useMemo(() => orderFeed.find(o => o.id === id), [orderFeed, id]);

  if (order == null) return (
    <div>
      Сожалею, заказ с id '#{id}' не найден!
    </div>
  );

  return (<div className={styles.main}>
    <div className={styles.content}>
        <span className={`text text_type_digits-default ${styles.center}`}>#{formatOrderNumber(order.number)}</span>
      <div className='mt-10'>
        <div className='text text_type_main-medium'>{order.name}</div>
        <div className='mt-1'><OrderFeedItemStatus status={order.status} /></div>
      </div>

      <div className='mt-15 mb-6 text text_type_main-medium'>Состав:</div>
      <OrderFeedDetailsPartList ingredients={order.ingredients} />
      <div className={styles.row}>
        <OrderData data={order.createdAt} />
        <div><MoneyCounter sum={order.ingredients.reduce((acc, next) => acc + next.price, 0)} /></div>
      </div>
    </div>
  </div>);
}