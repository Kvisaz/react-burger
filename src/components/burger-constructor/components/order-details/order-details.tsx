import React from 'react';
import styles from './order-details.module.css';
import { Assets } from '../../../../Assets';
import { useParams } from 'react-router-dom';
import { formatOrderNumber } from '../../../../services/converters/formatOrderNumber';
import { useMainState } from '../../../../services/hooks/useMainState';


const ICON_URL = Assets.images.orderDone;

interface OrderPageParams {
  id?: string;
}

export function OrderDetails() {

  const { orderSuccessResults } = useMainState();
  const { id = '-1' } = useParams<OrderPageParams>();
  const orderId = parseInt(id);
  const order = orderSuccessResults.find(i => i.orderId === orderId);
  if (order == null) return null;

  const { name: orderName } = order;

  return (
    <div className={styles.content}>
      <span className='text text_type_digits-large mb-8'>{formatOrderNumber(orderId)}</span>
      <span className='text text_type_main-medium mb-15'>{orderName}</span>
      <img src={ICON_URL} className={`mb-15 ${styles.done}`} alt='Иконка Готовности' />
      <span className='text text_type_main-default  mb-2'>Ваш заказ начали готовить</span>
      <span
        className='text text_type_main-small text_color_inactive mb-30'>Дождитесь готовности  на орбитальной станции</span>
    </div>
  );
}