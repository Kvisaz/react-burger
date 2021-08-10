import React, { useContext } from 'react';
import styles from './burger-constructor.module.css';
import { BurgerConstructorOrder } from './components/burger-constructor-order/burger-constructor-order';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { IBurgerPart } from '../../model/IBurgerPart';
import { IConstructorElementData, IConstructorElementType } from '../../model/IConstructorElementData';
import { IAppState } from '../../model/IAppState';
import { AppContext } from '../../service/AppContext';

export interface IConstructorElementProps extends IConstructorElementData {

}

export function mapBurgerItem(data: IBurgerPart): IConstructorElementProps {
	return {
		_id: data._id, price: data.price, text: data.name, thumbnail: data.image,
	};
}

export function BurgerConstructor() {
	const { selectedBun, selectedParts: parts, sum } = useContext<IAppState>(AppContext);

	return (
		<section className={`mt-4 mb-4 ${styles.main}`}>
			{selectedBun && <ConstructorElement {...selectedBun} type={IConstructorElementType.TOP} />}
			<div className={`mt-4 mb-4 ${styles.list}`}>
				{parts.map(props => (
					<ConstructorElement key={props._id} {...props} />
				))}
			</div>
			{selectedBun && <ConstructorElement {...selectedBun} type={IConstructorElementType.BOTTOM} />}
			{sum > 0 && (
				<div className={`mt-10 mb-10 ${styles.sum}`}>
					<BurgerConstructorOrder sum={sum} />
				</div>
			)}
		</section>
	);
}