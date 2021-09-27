import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './ingredient-details.module.css';
import { Nutrition } from './components/nutrition/nutrition';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../services/store';

interface IngredientParams {
  id?: string;
}

export function IngredientDetails() {
  const state = useSelector((state: RootState) => ({ ...state }));
  const { id } = useParams<IngredientParams>();

  const { ingredients } = state;
  const selectedIngredient = ingredients.find(i => i._id === id);
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