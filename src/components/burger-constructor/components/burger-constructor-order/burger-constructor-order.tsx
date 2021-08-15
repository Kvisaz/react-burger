import React, { useCallback } from 'react';
import styles from './burger-constructor-order.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { MoneyCounter } from '../../../common/money-counter/money-counter';
import { IBurgerActionType } from '../../../../services/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../../../model/IAppState';


export function BurgerConstructorOrder() {
	const dispatch = useDispatch();
	const state = useSelector(state => ({ ...state })) as IAppState;

	const { sum } = state;

	const onOrderButtonClick = useCallback(() => {
		dispatch({ type: IBurgerActionType.ORDER_CLICK });
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