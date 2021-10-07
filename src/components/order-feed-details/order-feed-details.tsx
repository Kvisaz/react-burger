import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styles from './order-feed-details.module.css';
import PropTypes from 'prop-types';
import { IOrderDetailsUrlParams } from '../../services/Routes';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { MoneyCounter } from '../common/money-counter/money-counter';
import { OrderData } from '../order-data/order-data';
import { OrderFeedDetailsPartList } from './components/order-feed-details-part-list/order-feed-details-part-list';

export interface IOrderFeedDetailsProps {
  withStatus?: boolean;
}

OrderFeedDetails.propTypes = {
  withStatus: PropTypes.bool,
};


export function OrderFeedDetails({ withStatus }: IOrderFeedDetailsProps) {
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
      <div>#{order.number}</div>
      <div>
        <div>{order.name}</div>
        {withStatus && (<div> {order.status} </div>)}
      </div>

      <div>Состав:</div>
      <OrderFeedDetailsPartList ingredients={order.ingredients} />
      <div>
        <OrderData data={order.createdAt} />
        <div><MoneyCounter sum={order.ingredients.reduce((acc, next) => acc + next.price, 0)} /></div>
      </div>
    </div>
  </div>);
}