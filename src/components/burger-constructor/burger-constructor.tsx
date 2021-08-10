import React, { useContext } from 'react';
import styles from './burger-constructor.module.css';
import { BurgerConstructorOrder } from './components/burger-constructor-order/burger-constructor-order';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { AppContext } from '../../service/AppContext';
import { IConstructorElementData, IConstructorElementType } from '../../model/IConstructorElementData';
import { IBurgerActionType } from '../../model/IBurgerAction';

function mapBun(bun: IConstructorElementData, suffix: string, type: IConstructorElementType): IConstructorElementData {
	return {
		...bun,
		text: `${bun.text} (${suffix})`,
		type,
	};
}

export function BurgerConstructor() {
	const { state, dispatch } = useContext(AppContext);
	const { selectedBun, selectedParts: parts, sum } = state;


	return (
		<section className={`mt-4 mb-4 ${styles.main}`}>
			{selectedBun && <ConstructorElement {...mapBun(selectedBun, 'верх', IConstructorElementType.TOP)} />}
			<div className={`mt-4 mb-4 ${styles.list}`}>
				{parts.map(props => (
					<ConstructorElement key={props._id} {...props} handleClose={() => dispatch({
						type: IBurgerActionType.INGREDIENT_REMOVE_CLICK,
						payload: { id: props._id },
					})} />
				))}
			</div>
			{selectedBun && <ConstructorElement  {...mapBun(selectedBun, 'низ', IConstructorElementType.BOTTOM)} />}
			{sum > 0 && (
				<div className={`mt-10 mb-10 ${styles.sum}`}>
					<BurgerConstructorOrder />
				</div>
			)}
		</section>
	);
}