import React from 'react';
import styles from './burger-constructor-order.module.css';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {MoneyCounter} from '../../../common/money-counter/money-counter';

interface IBasketOrderProps {
    sum: number;
}

export function BurgerConstructorOrder({sum}: IBasketOrderProps) {
    return (
        <div className={`mr-4 ${styles.main}`}>
            <div className='mr-10'><MoneyCounter sum={sum} big/></div>
            <Button type="primary" size="large">
                Оформить заказ
            </Button>
        </div>
    )
}