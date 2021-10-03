import React from 'react';
import styles from './order-feed-page.module.css';
import { OrderFeed } from '../../components/order-feed/order-feed';

export function OrderFeedPage() {
  return (
    <div className={styles.main}>
      <div className={styles.colLeft}>
        <OrderFeed />
      </div>
      <div className={styles.colRight}>
        colRight
      </div>
    </div>
  );
}