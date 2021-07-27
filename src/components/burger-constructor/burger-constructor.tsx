import React from 'react';
import styles from './burger-constructor.module.css';
import {BurgerConstructorItem} from "./components/basket-item/burger-constructor-item";
import {BurgerConstructorOrder} from './components/basket-order/burger-constructor-order';
import {ISelectedBurgerPart} from '../../model/ISelectedBurgerPart';

interface IBurgerIngredientsProps {
    parts: ISelectedBurgerPart[]
}

export function BurgerConstructor({parts}: IBurgerIngredientsProps) {
    return (
        <section className={`mt-4 mb-4 ${styles.main}`}>
            <div className={`pt-4 pb-4 ${styles.list}`}>
                {parts.map(p => (
                    <BurgerConstructorItem key={p._id} part={p}/>
                ))}
            </div>
            <div className={`mt-10 mb-10 ${styles.sum}`}>
                <BurgerConstructorOrder sum={100} />
            </div>
        </section>
    );
}