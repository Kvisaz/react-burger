import React, { useMemo } from 'react';
import styles from './order-details.module.css';
import { Assets } from '../../../../Assets';
import { useParams } from 'react-router-dom';
import { formatOrderNumber } from '../../../../services/converters/formatOrderNumber';
import { useOrderState } from '../../../../services/hooks';


const ICON_URL = Assets.images.orderDone;

interface OrderPageParams {
  id?: string;
}

export function OrderDetails() {

  const { showedOrders } = useOrderState();
  const { id = '-1' } = useParams<OrderPageParams>();
  const order = useMemo(() => showedOrders.find(order => order.id === id), [showedOrders, id]);
  if (order == null) return null;

  console.log('OrderDetails', order);

  return (
    <div className={styles.content}>
      <span className='text text_type_digits-large mb-8'>{formatOrderNumber(order.number)}</span>
      <span className='text text_type_main-medium mb-15'>{order.name}</span>
      <img src={ICON_URL} className={`mb-15 ${styles.done}`} alt='Иконка Готовности' />
      <span className='text text_type_main-default  mb-2'>Ваш заказ начали готовить</span>
      <span
        className='text text_type_main-small text_color_inactive mb-30'>Дождитесь готовности  на орбитальной станции</span>
    </div>
  );
}