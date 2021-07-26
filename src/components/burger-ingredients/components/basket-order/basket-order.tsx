import React from 'react';
import styles from './basket-order.module.css';

interface IBasketOrderProps {
    sum: number;
}

export function BasketOrder({sum}: IBasketOrderProps) {
    return (
        <div className={styles.main}>
            {sum}
        </div>
    )
}