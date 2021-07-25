import React from 'react';
import styles from './basket-item.module.css';
import {IBurgerPart} from "../../../../model/IBurgerPart";
import {CurrencyIcon, DeleteIcon, DragIcon, LockIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IBasketItemProps {
    part: IBurgerPart;
    locked?: boolean;
}

export function BasketItem({part, locked}: IBasketItemProps) {
    locked = Math.random() > 0.5;//locked === true;
    const iconType = 'primary'
    const dragIcon = (<DragIcon type={iconType}/>);
    const dragIconClass = locked ? styles.hidden : '';
    const actionIcon = locked ? (<LockIcon type='secondary'/>) : (<DeleteIcon type={iconType}/>);
    const currencyIcon = (<CurrencyIcon type={iconType}/>);
    return (
        <div className={`pt-4 pb-4 mb-4 ${styles.item}`}>
            <span className={`mr-8 ${styles.icon} ${dragIconClass}`}>{dragIcon}</span>
            <img src={part.image} alt={part.name} className={`mr-5 ${styles.image}`}/>
            <span className={`mr-5 text text_type_main-default ${styles.name}`}>{part.name}</span>
            <span className='text text_type_digits-default mr-2'>{part.price}</span>
            <span className={`mr-5 ${styles.icon}`}>{currencyIcon}</span>
            <span className={`mr-5 ${styles.icon}`}>{actionIcon}</span>
        </div>
    );
}