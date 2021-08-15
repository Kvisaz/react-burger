import React, { useCallback } from 'react';
import styles from './burger-ingredients-item.module.css';
import { IBurgerPart, IBurgerPartPropType } from '../../../../model/IBurgerPart';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { MoneyCounter } from '../../../common/money-counter/money-counter';
import { useDispatch, useSelector } from 'react-redux';
import { IBurgerActionType } from '../../../../services/actions';
import { IAppState } from '../../../../model/IAppState';

interface IBurgerConstructorItemProps {
	part: IBurgerPart;
}

BurgerIngredientsItem.propTypes = {
	part: IBurgerPartPropType.isRequired,
};

export function BurgerIngredientsItem({ part }: IBurgerConstructorItemProps) {

	const dispatch = useDispatch();
	const state = useSelector(state => ({ ...state })) as IAppState;

	const { ingredientAmountMap } = state;
	const { price, name, image, _id } = part;
	const amount = ingredientAmountMap[_id] ?? 0;
	const onItemClick = useCallback((ingredient: IBurgerPart) => {
		console.log('onItemClick', ingredient);
		dispatch({ type: IBurgerActionType.INGREDIENT_SELECT_CLICK, ingredient });
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