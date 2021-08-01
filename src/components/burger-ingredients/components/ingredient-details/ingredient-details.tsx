import React from 'react';
import styles from './ingredient-details.module.css';
import {IBurgerPart} from '../../../../model/IBurgerPart';
import {Nutrition} from './components/nutrition/nutrition';
import PropTypes from 'prop-types';

interface IDetailsProps extends IBurgerPart {
    image: string;
    name: string;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
}


IngredientDetails.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
};

export function IngredientDetails({image, name, carbohydrates, fat, calories, proteins}: IDetailsProps) {
    return (
        <div className={`mb-15 ${styles.content}`}>
            <div className={`mb-4 ${styles.image_wrapper}`}><img src={image} alt={name}/></div>
            <span className={`mb-8 text text_type_main-medium`}>{name}</span>
            <div className={styles.nutrition}>
                <Nutrition text={'Калории, г'} value={calories}/>
                <Nutrition text={'Белки, г'} value={proteins}/>
                <Nutrition text={'Жиры, г'} value={fat}/>
                <Nutrition text={'Углеводы, г'} value={carbohydrates}/>
            </div>
        </div>
    )
}