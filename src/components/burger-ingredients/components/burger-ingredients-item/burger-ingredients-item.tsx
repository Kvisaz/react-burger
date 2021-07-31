import React from 'react';
import styles from './burger-ingredients-item.module.css';
import {IBurgerPart} from '../../../../model/IBurgerPart';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {MoneyCounter} from '../../../common/money-counter/money-counter';

interface IBurgerConstructorItemProps {
    part: IBurgerPart;
    amount?: number;
    onItemClick: (part: IBurgerPart) => void;
}

export function BurgerIngredientsItem({part, amount = 0, onItemClick}: IBurgerConstructorItemProps) {

    const hasAmount = amount > 0;
    const counter = hasAmount ? (<Counter count={amount} size='default'/>) : null;
    return (
        <div className={styles.item} onClick={() => onItemClick(part)}>
            <img src={part.image} alt={part.name} className={styles.image}/>
            <MoneyCounter sum={part.price}/>
            <div className={`text text_type_main-default ${styles.name}`}>{part.name}</div>
            {counter}
        </div>
    )
}