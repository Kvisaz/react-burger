import React from 'react';
import styles from './order-details.module.css';
import {Assets} from '../../../../Assets';

interface IOrderProps {
    orderId: number;
}

const ICON_URL = Assets.images.orderDone;

export function OrderDetails({orderId}: IOrderProps) {

    const orderIdText = `${orderId}`.padStart(6, '0');

    return (
        <div className={styles.content}>
            <span className='text text_type_digits-large mb-8'>{orderIdText}</span>
            <span className='text text_type_main-medium mb-15'>Идентификатор заказа</span>
            <img src={ICON_URL} className={`mb-15 ${styles.done}`} alt='Иконка Готовности' />
            <span className='text text_type_main-default  mb-2'>Ваш заказ начали готовить</span>
            <span className='text text_type_main-small text_color_inactive mb-30'>Дождитесь готовности  на орбитальной станции</span>
        </div>
    )
}