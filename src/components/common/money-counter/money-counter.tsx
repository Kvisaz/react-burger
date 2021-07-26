import React from 'react';
import styles from './money-counter.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

interface IMoneyCounterProps {
    sum: number;
}

export function MoneyCounter({sum}: IMoneyCounterProps) {
    return (
        <div className={`text text_type_digits-default ${styles.counter}`}>
            <span className='mr-2'>{sum}</span>
            <CurrencyIcon type={'primary'}/>
        </div>
    )
}