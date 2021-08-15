import React, { useEffect, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import { BurgerIngredientsTabs } from './components/burger-ingredients-tabs/burger-ingredients-tabs';
import { BurgerIngredientsSection } from './components/burger-ingredients-section/burger-ingredients-section';
import { IBurgerPart } from '../../model/IBurgerPart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { fetchIngredientsActionCreator } from '../../services/actions';

const scrollToRef = (ref: React.MutableRefObject<HTMLElement>) => {
	const el = ref.current;
	const toY = el.offsetTop;
	window.scrollTo(0, toY);
};


export function BurgerIngredients() {

	const ingredients = useSelector<RootState>(store => store.ingredients) as IBurgerPart[]
	const dispatch = useDispatch();

	const bunRef = useRef(null);
	const mainRef = useRef(null);
	const sauceRef = useRef(null);

	useEffect(() => {
		dispatch(fetchIngredientsActionCreator());
	}, [dispatch]);

	const buns: IBurgerPart[] = [];
	const fills: IBurgerPart[] = [];
	const sauces: IBurgerPart[] = [];
	ingredients.forEach((part) => {
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
				<BurgerIngredientsSection title={'Булки'} parts={buns} ref={bunRef} />
				<BurgerIngredientsSection title={'Соусы'} parts={sauces} ref={sauceRef} />
				<BurgerIngredientsSection title={'Начинки'} parts={fills} ref={mainRef} />
			</div>
		</div>
	);
}