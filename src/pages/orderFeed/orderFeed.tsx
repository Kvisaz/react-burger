import React from 'react';
import styles from './orderFeed.module.css';

export function OrderFeed() {
  return (
    <div className={`text ${styles.main}`}>
      <h1 className='text_type_main-medium'>Лента заказов</h1>
      <p>Order 1</p>
      <p>Order 2</p>
    </div>
  );
}