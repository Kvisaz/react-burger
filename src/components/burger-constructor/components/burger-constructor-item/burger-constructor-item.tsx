import React from 'react';
import styles from './burger-constructor-item.module.css';
import {IBurgerPart} from '../../../../model/IBurgerPart';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

interface IBurgerConstructorItemProps {
    part: IBurgerPart;
    amount?: number;
}

export function BurgerConstructorItem({part}: IBurgerConstructorItemProps) {
    return (
        <div className={styles.item}>
            <img src={part.image} alt={part.name} className={styles.image}/>
            <div className={`text text_type_digits-default ${styles.price}`}>
                <span className='mr-2'>{part.price}</span>
                <CurrencyIcon type={'primary'}/>
            </div>
            <div className={`text text_type_main-default ${styles.name}`}>{part.name}</div>
        </div>
    )
}