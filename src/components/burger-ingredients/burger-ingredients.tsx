import React, {useContext} from 'react';
import styles from './burger-ingredients.module.css';
import {BurgerIngredientsTabs} from "./components/burger-ingredients-tabs/burger-ingredients-tabs";
import {BurgerIngredientsSection} from "./components/burger-ingredients-section/burger-ingredients-section";
import {IBurgerPart} from "../../model/IBurgerPart";
import {AppContext} from "../../service/AppContext";
import PropTypes from 'prop-types';

interface IBurgerConstructorProps {
    onIngredientClick: (part: IBurgerPart) => void;
}

BurgerIngredients.propTypes = {
    onIngredientClick: PropTypes.func.isRequired
};

export function BurgerIngredients({onIngredientClick}: IBurgerConstructorProps) {

    const {ingredients: parts} = useContext(AppContext);
    
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