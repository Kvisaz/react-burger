import React from 'react';
import styles from './burger-ingredients.module.css';
import {BurgerIngredientsTabs} from "./components/burger-ingredients-tabs/burger-ingredients-tabs";
import {BurgerIngredientsSection} from "./components/burger-ingredients-section/burger-ingredients-section";
import {IBurgerPart, IBurgerPartPropType} from "../../model/IBurgerPart";
import PropTypes from 'prop-types';

interface IBurgerConstructorProps {
    parts: IBurgerPart[];
    onIngredientClick: (part: IBurgerPart) => void;
}

BurgerIngredients.propTypes = {
    parts: PropTypes.arrayOf(IBurgerPartPropType).isRequired,
    onIngredientClick: PropTypes.func.isRequired
};

export function BurgerIngredients({parts, onIngredientClick}: IBurgerConstructorProps) {

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
            <BurgerIngredientsTabs/>
            <div className={`mb-10 ${styles.list}`}>
                <BurgerIngredientsSection title={'Булки'} parts={buns} onItemClick={onIngredientClick}/>
                <BurgerIngredientsSection title={'Соусы'} parts={sauces} onItemClick={onIngredientClick}/>
                <BurgerIngredientsSection title={'Начинки'} parts={fills} onItemClick={onIngredientClick}/>
            </div>
        </div>
    );
}