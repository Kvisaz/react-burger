import React, { useCallback, useContext } from 'react';
import styles from './burger-constructor-order.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { MoneyCounter } from '../../../common/money-counter/money-counter';
import { AppContext } from '../../../../services/AppContext';
import { IBurgerActionType } from '../../../../model/IBurgerAction';


export function BurgerConstructorOrder() {
	const { state, dispatch } = useContext(AppContext);
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