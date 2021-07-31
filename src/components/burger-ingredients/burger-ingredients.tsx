import React, {useCallback, useState} from 'react';
import styles from './burger-ingredients.module.css';
import {BurgerIngredientsTabs} from "./components/burger-ingredients-tabs/burger-ingredients-tabs";
import {BurgerIngredientsSection} from "./components/burger-ingredients-section/burger-ingredients-section";
import {IBurgerPart, IBurgerPartPropType} from "../../model/IBurgerPart";
import {IngredientDetails} from './components/ingredient-details/ingredient-details';
import {Modal} from '../common/modal/modal';
import PropTypes from 'prop-types';

interface IBurgerConstructorProps {
    parts: IBurgerPart[]
}

BurgerIngredients.propTypes = {
    parts: PropTypes.arrayOf(IBurgerPartPropType).isRequired
};

interface IState {
    showIngredient: boolean;
    selectedIngredient?: IBurgerPart
}

export function BurgerIngredients({parts}: IBurgerConstructorProps) {

    const [state, setState] = useState<IState>({
        showIngredient: false
    });

    const onHideClick = useCallback(() => {
        setState({
            showIngredient: false,
            selectedIngredient: undefined
        })
    }, []);

    const onItemClick = useCallback((part: IBurgerPart) => {
        if (state.showIngredient) return;
        setState({
            showIngredient: true,
            selectedIngredient: {...part}
        })
    }, [state.showIngredient])

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

    const selected = state.selectedIngredient;

    return (
        <div className={`${styles.main}`}>
            <BurgerIngredientsTabs/>
            <div className={`mb-10 ${styles.list}`}>
                <BurgerIngredientsSection title={'Булки'} parts={buns} onItemClick={onItemClick}/>
                <BurgerIngredientsSection title={'Соусы'} parts={sauces} onItemClick={onItemClick}/>
                <BurgerIngredientsSection title={'Начинки'} parts={fills} onItemClick={onItemClick}/>
            </div>
            {selected && (
                <Modal visible={state.showIngredient} title={'Детали ингредиента'} onHide={onHideClick}>
                    <IngredientDetails  {...selected} image={selected.image_large}/>
                </Modal>
            )}
        </div>
    );
}