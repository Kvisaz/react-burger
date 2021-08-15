import React from 'react';
import styles from './order-details.module.css';
import { Assets } from '../../../../Assets';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../../model/IAppState';


const ICON_URL = Assets.images.orderDone;

export function OrderDetails() {

	const state = useSelector(state => ({ ...state })) as IAppState;

	const { orderId, orderName } = state;

	const orderIdText = `${orderId}`.padStart(6, '0');

	return (
		<div className={styles.content}>
			<span className='text text_type_digits-large mb-8'>{orderIdText}</span>
			<span className='text text_type_main-medium mb-15'>{orderName}</span>
			<img src={ICON_URL} className={`mb-15 ${styles.done}`} alt='Иконка Готовности' />
			<span className='text text_type_main-default  mb-2'>Ваш заказ начали готовить</span>
			<span className='text text_type_main-small text_color_inactive mb-30'>Дождитесь готовности  на орбитальной станции</span>
		</div>
	);
}