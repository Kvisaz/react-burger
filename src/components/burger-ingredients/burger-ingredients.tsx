import React from 'react';
import styles from './burger-ingredients.module.css';
import {IBurgerPart} from "../../model/IBurgerPart";
import {BasketItem} from "./components/basket-item/basket-item";

interface IBurgerIngredientsProps {
    parts: IBurgerPart[]
}

export function BurgerIngredients({parts}: IBurgerIngredientsProps) {
    return (
        <section className={`mt-4 mb-4 ${styles.main}`}>
            <div className={`pt-4 pb-4 ${styles.list}`}>
                {parts.map(p => (
                    <BasketItem key={p._id} part={p}/>
                ))}
            </div>
            <div className={`mt-10 ${styles.sum}`}>
                Sum
            </div>
        </section>
    );
}