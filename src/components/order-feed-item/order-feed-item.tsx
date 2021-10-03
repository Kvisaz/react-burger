import React, { useMemo } from 'react';
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
  isStatusVisible?: boolean;
}

export function OrderFeedItem({ name, isStatusVisible, number, ingredients, status, createdAt }: IOrderFeedItemProps) {
  const dateText = useMemo(() => formatDate(createdAt), [createdAt]);

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <div className='text text_type_digits-default'>#{number}</div>
        <div className='text text_type_main-default text_color_inactive'>{dateText}</div>
      </div>
      <div className={styles.rowName}>
        <div className='text text_type_main-medium'>{name}</div>
        {isStatusVisible && (<OrderFeedItemStatus status={status} />)}
      </div>
      <OrderFeedItemParts ingredients={ingredients} />
    </div>
  );
}