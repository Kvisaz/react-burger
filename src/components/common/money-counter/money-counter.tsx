import React from 'react';
import styles from './money-counter.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

interface IMoneyCounterProps {
    sum: number;
    big?: boolean;
}

export function MoneyCounter({sum, big = false}: IMoneyCounterProps) {
    const digitClass = big ? 'text_type_digits-medium' : 'text_type_digits-default';
    const iconClass = big ? styles.big_icon : '';
    return (
        <div className={`text ${digitClass} ${styles.main}`}>
            <div className='mr-2'>{sum}</div>
            <div className={iconClass}>
                <CurrencyIcon type={'primary'}/>
            </div>
        </div>
    )
}