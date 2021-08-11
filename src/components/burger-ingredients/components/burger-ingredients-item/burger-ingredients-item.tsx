import React, { useCallback, useContext } from 'react';
import styles from './burger-ingredients-item.module.css';
import { IBurgerPart, IBurgerPartPropType } from '../../../../model/IBurgerPart';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { MoneyCounter } from '../../../common/money-counter/money-counter';
import { AppContext } from '../../../../service/AppContext';
import { IBurgerActionType } from '../../../../model/IBurgerAction';

interface IBurgerConstructorItemProps {
	part: IBurgerPart;
}

BurgerIngredientsItem.propTypes = {
	part: IBurgerPartPropType.isRequired,
};

export function BurgerIngredientsItem({ part }: IBurgerConstructorItemProps) {

	const { dispatch, state } = useContext(AppContext);
	const { ingredientAmountMap } = state;
	const { price, name, image, _id } = part;
	const amount = ingredientAmountMap[_id] ?? 0;
	const onItemClick = useCallback((part: IBurgerPart) => {
		dispatch({ type: IBurgerActionType.INGREDIENT_SELECT_CLICK, payload: part });
	}, [dispatch]);

	const hasAmount = amount > 0;
	const counter = hasAmount ? (<Counter count={amount} size='default' />) : null;
	return (
		<div className={styles.item} onClick={() => onItemClick(part)}>
			<img src={image} alt={name} className={styles.image} />
			<MoneyCounter sum={price} />
			<div className={`text text_type_main-default ${styles.name}`}>{name}</div>
			{counter}
		</div>
	);
}