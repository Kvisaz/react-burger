import React from 'react';
import styles from './burger-constructor.module.css';
import { BurgerConstructorOrder } from './components/burger-constructor-order/burger-constructor-order';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { IConstructorElementData, IConstructorElementType } from '../../model/IConstructorElementData';
import { IBurgerActionType, onIngredientDropActionCreator } from '../../services/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { useDrop } from 'react-dnd';
import { IdObject } from '../../model/IdObject';

function mapBun(bun: IConstructorElementData, suffix: string, type: IConstructorElementType): IConstructorElementData {
	return {
		...bun,
		text: `${bun.text} (${suffix})`,
		type,
		isLocked: true,
	};
}

export function BurgerConstructor() {
	const dispatch = useDispatch();
	const state = useSelector((state: RootState) => ({ ...state }));

	const { selectedBun, selectedParts: parts, sum } = state;

	const [{}, dropTargetRef] = useDrop({
		accept: 'item', // обязательное обозначение типа из drag
		drop(item) {
			const { id } = item as IdObject;
			dispatch(onIngredientDropActionCreator(id));
		}
	}, [dispatch]);


	return (
		<section className={`mt-4 mb-4 ${styles.main}`} ref={dropTargetRef}>
			{selectedBun && <ConstructorElement {...mapBun(selectedBun, 'верх', IConstructorElementType.TOP)} />}
			<div className={`mt-4 mb-4 ${styles.list}`}>
				{parts.map(part => (
					<ConstructorElement key={part.selectedId} {...part} handleClose={() => dispatch({
						type: IBurgerActionType.INGREDIENT_REMOVE_CLICK,
						payload: { selectedId: part.selectedId, ingredientId: part.ingredientId },
					})} />
				))}
			</div>
			{selectedBun && <ConstructorElement  {...mapBun(selectedBun, 'низ', IConstructorElementType.BOTTOM)} />}
			{sum > 0 && selectedBun && (
				<div className={`mt-10 mb-10 ${styles.sum}`}>
					<BurgerConstructorOrder />
				</div>
			)}
		</section>
	);
}