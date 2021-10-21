import React from 'react';
import styles from './order-feed-page.module.css';
import { OrderFeed } from '../../components/order-feed/order-feed';
import { OrderFeedInfo } from '../../components/order-feed-info/order-feed-info';

export function OrderFeedPage() {
  return (
    <div className={styles.main}>
      <div className='text text_type_main-large mt-10 mb-4'>Лента заказов</div>
      <div className={styles.columns}>
        <div className={styles.colLeft}>
          <OrderFeed />
        </div>
        <div className={styles.colRight}>
          <OrderFeedInfo />
        </div>
      </div>
    </div>
  );
}