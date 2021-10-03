import React, { useMemo } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styles from './order-feed-item.module.css';
import { formatDate } from './utils/formatDate';
import { OrderFeedItemStatus } from '../order-feed-item-status/order-feed-item-status';
import { OrderFeedItemParts } from '../order-feed-item-parts/order-feed-item-parts';
import { IBurgerPart } from '../../services/model/IBurgerPart';

export interface IOrderFeedItemProps {
  name: string;
  id: string;
  number: number;
  ingredients: IBurgerPart[];
  status: string;
  createdAt: string;
  withStatus?: boolean;
}

export function OrderFeedItem({ id, name, withStatus, number, ingredients, status, createdAt }: IOrderFeedItemProps) {
  const dateText = useMemo(() => formatDate(createdAt), [createdAt]);
  const history = useHistory();
  const { url } = useRouteMatch();
  const openUrl = useMemo(() => `${url}/${id}`, [url, id]);
  return (
    <div className={styles.main} onClick={() => history.push(openUrl)}>
      <div className={styles.row}>
        <div className='text text_type_digits-default'>#{number}</div>
        <div className='text text_type_main-default text_color_inactive'>{dateText}</div>
      </div>
      <div className={styles.rowName}>
        <div className='text text_type_main-medium'>{name}</div>
        {withStatus && (<OrderFeedItemStatus status={status} />)}
      </div>
      <OrderFeedItemParts ingredients={ingredients} maxLength={6} />
    </div>
  );
}