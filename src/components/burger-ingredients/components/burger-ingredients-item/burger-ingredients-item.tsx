import React, { useCallback, useContext } from 'react';
import styles from './burger-ingredients-item.module.css';
import { IBurgerPart, IBurgerPartPropType } from '../../../../model/IBurgerPart';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { MoneyCounter } from '../../../common/money-counter/money-counter';
import PropTypes from 'prop-types';
import { AppContext } from '../../../../service/AppContext';
import { IBurgerActionType } from '../../../../model/IBurgerAction';

interface IBurgerConstructorItemProps {
	part: IBurgerPart;
	amount?: number;
}

BurgerIngredientsItem.propTypes = {
	part: IBurgerPartPropType.isRequired,
	amount: PropTypes.number,
};

export function BurgerIngredientsItem({ part, amount = 0 }: IBurgerConstructorItemProps) {

	const { dispatch } = useContext(AppContext);
	const onItemClick = useCallback((part: IBurgerPart) => {
		if (dispatch) {
			dispatch({ type: IBurgerActionType.INGREDIENT_CLICK, payload: part });
		}
	}, [dispatch]);

	const hasAmount = amount > 0;
	const counter = hasAmount ? (<Counter count={amount} size='default' />) : null;
	return (
		<div className={styles.item} onClick={() => onItemClick(part)}>
			<img src={part.image} alt={part.name} className={styles.image} />
			<MoneyCounter sum={part.price} />
			<div className={`text text_type_main-default ${styles.name}`}>{part.name}</div>
			{counter}
		</div>
	);
}