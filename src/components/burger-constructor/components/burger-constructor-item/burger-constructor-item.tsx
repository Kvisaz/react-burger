import React from 'react';
import styles from './burger-constructor-item.module.css';
import {IBurgerPart} from '../../../../model/IBurgerPart';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {MoneyCounter} from '../../../common/money-counter/money-counter';

interface IBurgerConstructorItemProps {
    part: IBurgerPart;
    amount?: number;
}

export function BurgerConstructorItem({part, amount = 0}: IBurgerConstructorItemProps) {
    console.log('part amount', amount);
    const hasAmount = amount > 0;
    const counter = hasAmount ? (<Counter count={amount} size='default'/>) : null;
    return (
        <div className={styles.item}>
            <img src={part.image} alt={part.name} className={styles.image}/>
            <MoneyCounter sum={part.price}/>
            <div className={`text text_type_main-default ${styles.name}`}>{part.name}</div>
            {counter}
        </div>
    )
}