import React, { useContext } from 'react';
import styles from './burger-ingredients.module.css';
import { BurgerIngredientsTabs } from './components/burger-ingredients-tabs/burger-ingredients-tabs';
import { BurgerIngredientsSection } from './components/burger-ingredients-section/burger-ingredients-section';
import { IBurgerPart } from '../../model/IBurgerPart';
import { AppContext } from '../../services/AppContext';


export function BurgerIngredients() {

	const { state } = useContext(AppContext);
	const { ingredients: parts } = state;

	const buns: IBurgerPart[] = [];
	const fills: IBurgerPart[] = [];
	const sauces: IBurgerPart[] = [];
	parts.forEach((part) => {
		switch (part.type) {
			case 'bun':
				buns.push(part);
				break;
			case 'main':
				fills.push(part);
				break;
			case 'sauce':
				sauces.push(part);
				break;
		}
	});


	return (
		<div className={`${styles.main}`}>
			<BurgerIngredientsTabs />
			<div className={`mb-10 ${styles.list}`}>
				<BurgerIngredientsSection title={'Булки'} parts={buns} />
				<BurgerIngredientsSection title={'Соусы'} parts={sauces} />
				<BurgerIngredientsSection title={'Начинки'} parts={fills} />
			</div>
		</div>
	);
}