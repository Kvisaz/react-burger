import React, { useContext } from 'react';
import styles from './burger-constructor.module.css';
import { BurgerConstructorOrder } from './components/burger-constructor-order/burger-constructor-order';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { AppContext } from '../../services/AppContext';
import { IConstructorElementData, IConstructorElementType } from '../../model/IConstructorElementData';
import { IBurgerActionType } from '../../model/IBurgerAction';

function mapBun(bun: IConstructorElementData, suffix: string, type: IConstructorElementType): IConstructorElementData {
	return {
		...bun,
		text: `${bun.text} (${suffix})`,
		type,
		isLocked: true,
	};
}

export function BurgerConstructor() {
	const { state, dispatch } = useContext(AppContext);
	const { selectedBun, selectedParts: parts, sum } = state;

	return (
		<section className={`mt-4 mb-4 ${styles.main}`}>
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