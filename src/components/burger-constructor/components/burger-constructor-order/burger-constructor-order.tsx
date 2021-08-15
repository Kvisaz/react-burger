import React, { useCallback } from 'react';
import styles from './burger-constructor-order.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { MoneyCounter } from '../../../common/money-counter/money-counter';
import { useDispatch, useSelector } from 'react-redux';
import { onOrderClickActionCreator } from '../../../../services/actions';
import { RootState } from '../../../../services/store';


export function BurgerConstructorOrder() {
	const dispatch = useDispatch();
	const state = useSelector((state:RootState) => ({ ...state.main }));

	const { sum } = state;

	const onOrderButtonClick = useCallback(() => {
		dispatch(onOrderClickActionCreator());
	}, [dispatch]);

	return (
		<div className={`mr-4 ${styles.main}`}>
			<div className='mr-10'><MoneyCounter sum={sum} big /></div>
			<Button type='primary' size='large' onClick={onOrderButtonClick}>
				Оформить заказ
			</Button>
		</div>
	);
}