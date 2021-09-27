import React from 'react';
import styles from './orders.module.css';

export function Orders(){
  return (
      <div className={`text ${styles.main}`}>
            <h1 className='text_type_main-medium'>Orders</h1>
            <p>Order 1</p>
            <p>Order 2</p>
      </div>
  )
}