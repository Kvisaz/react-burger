import React from 'react';
import styles from './burger-ingredients.module.css';
import {BasketItem} from "./components/basket-item/basket-item";
import {BasketOrder} from './components/basket-order/basket-order';
import {ISelectedBurgerPart} from '../../model/ISelectedBurgerPart';

interface IBurgerIngredientsProps {
    parts: ISelectedBurgerPart[]
}

export function BurgerIngredients({parts}: IBurgerIngredientsProps) {
    return (
        <section className={`mt-4 mb-4 ${styles.main}`}>
            <div className={`pt-4 pb-4 ${styles.list}`}>
                {parts.map(p => (
                    <BasketItem key={p._id} part={p}/>
                ))}
            </div>
            <div className={`mt-10 mb-10 ${styles.sum}`}>
                <BasketOrder sum={100} />
            </div>
        </section>
    );
}