import React from 'react';
import styles from './ingredient-details.module.css';
import { Nutrition } from './components/nutrition/nutrition';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../services/store';


export function IngredientDetails() {
	const state = useSelector((state:RootState) => ({ ...state.main }));

	const { selectedIngredient } = state;
	if (selectedIngredient == null) return null;

	const { image_large, name, carbohydrates, fat, calories, proteins } = selectedIngredient;

	return (
		<div className={`mb-15 ${styles.content}`}>
			<div className={`mb-4 ${styles.image_wrapper}`}><img src={image_large} alt={name} /></div>
			<span className={`mb-8 text text_type_main-medium`}>{name}</span>
			<div className={styles.nutrition}>
				<Nutrition text={'Калории, г'} value={calories} />
				<Nutrition text={'Белки, г'} value={proteins} />
				<Nutrition text={'Жиры, г'} value={fat} />
				<Nutrition text={'Углеводы, г'} value={carbohydrates} />
			</div>
		</div>
	);
}