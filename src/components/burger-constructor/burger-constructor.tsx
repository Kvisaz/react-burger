import React, { useContext } from 'react';
import styles from './burger-constructor.module.css';
import { BurgerConstructorOrder } from './components/burger-constructor-order/burger-constructor-order';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IAppState } from '../../model/IAppState';
import { AppContext } from '../../service/AppContext';
import { IConstructorElementData, IConstructorElementType } from '../../model/IConstructorElementData';


interface IBurgerIngredientsProps {
	onOrderButtonClick: () => void;
}

BurgerConstructor.propTypes = {
	onOrderButtonClick: PropTypes.func,
};

function mapBun(bun: IConstructorElementData, suffix: string, type: IConstructorElementType): IConstructorElementData {
	return {
		...bun,
		text: `${bun.text} (${suffix})`,
		type,
	};
}

export function BurgerConstructor({ onOrderButtonClick }: IBurgerIngredientsProps) {
	console.log('onOrderButtonClick', onOrderButtonClick)
	const { selectedBun, selectedParts: parts, sum } = useContext<IAppState>(AppContext);
	return (
		<section className={`mt-4 mb-4 ${styles.main}`}>
			{selectedBun && <ConstructorElement {...mapBun(selectedBun, 'верх', IConstructorElementType.TOP)} />}
			<div className={`mt-4 mb-4 ${styles.list}`}>
				{parts.map(props => (
					<ConstructorElement key={props._id} {...props} />
				))}
			</div>
			{selectedBun && <ConstructorElement  {...mapBun(selectedBun, 'низ', IConstructorElementType.BOTTOM)} />}
			{sum > 0 && (
				<div className={`mt-10 mb-10 ${styles.sum}`}>
					<BurgerConstructorOrder sum={sum} onClick={onOrderButtonClick} />
				</div>
			)}
		</section>
	);
}