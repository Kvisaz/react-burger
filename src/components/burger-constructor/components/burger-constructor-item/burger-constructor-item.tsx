import React from 'react';
import styles from './burger-constructor-item.module.css';
import {IBurgerPart} from '../../../../model/IBurgerPart';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

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
            <div className={`text text_type_digits-default ${styles.price}`}>
                <span className='mr-2'>{part.price}</span>
                <CurrencyIcon type={'primary'}/>
            </div>
            <div className={`text text_type_main-default ${styles.name}`}>{part.name}</div>
            {counter}
        </div>
    )
}