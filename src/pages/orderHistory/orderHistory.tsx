import React from 'react';
import styles from './orderHistory.module.css';

export function OrderHistory() {
  return (
    <div className={`text ${styles.main}`}>
      <h1 className='text_type_main-medium'>История заказов</h1>
      <p>Order 1</p>
      <p>Order 2</p>
    </div>
  );
}