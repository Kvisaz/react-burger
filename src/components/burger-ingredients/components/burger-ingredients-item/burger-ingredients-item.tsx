import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-item.module.css';
import { IBurgerPart, IBurgerPartPropType } from '../../../../model/IBurgerPart';
import { MoneyCounter } from '../../../common/money-counter/money-counter';
import { RootState } from '../../../../services/store';
import { useHistory, useLocation } from 'react-router-dom';
import { Routes } from '../../../../services/Routes';
import { setModalUrlOn } from '../../../../services/actions';

interface IBurgerConstructorItemProps {
	part: IBurgerPart;
}

BurgerIngredientsItem.propTypes = {
	part: IBurgerPartPropType.isRequired,
};

export function BurgerIngredientsItem({ part }: IBurgerConstructorItemProps) {

	const state = useSelector((state: RootState) => ({ ...state }));
	const dispatch = useDispatch();
	const location = useLocation();

	const [_, dragRef] = useDrag({
		type: 'item',
		item: { id: part._id },
	}, [part]);

	const { ingredientAmountMap } = state;
	const { price, name, image, _id } = part;
	const amount = ingredientAmountMap[_id] ?? 0;

	const history = useHistory();

	const onItemClick = useCallback((ingredient: IBurgerPart) => {
		dispatch(setModalUrlOn());
		history.replace({
			pathname: Routes.ingredientLinkCreator(ingredient._id),
		});

	}, [history, dispatch]);

	const hasAmount = amount > 0;
	const counter = hasAmount ? (<Counter count={amount} size='default' />) : null;
	return (
		<div className={styles.item} onClick={() => onItemClick(part)} ref={dragRef}>
			<img src={image} alt={name} className={styles.image} />
			<MoneyCounter sum={price} />
			<div className={`text text_type_main-default ${styles.name}`}>{name}</div>
			{counter}
		</div>
	);
}