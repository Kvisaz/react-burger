import React from 'react';
import styles from './basket-item.module.css';
import {DeleteIcon, DragIcon, LockIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {MoneyCounter} from '../../../common/money-counter/money-counter';
import {BunType, ISelectedBurgerPart} from '../../../../model/ISelectedBurgerPart';

interface IBasketItemProps {
    part: ISelectedBurgerPart;
}

export function BasketItem({part}: IBasketItemProps) {
    const locked = part.locked === true;

    function getNameSuffix(bun?: BunType): string {
        switch (bun) {
            case BunType.top:
                return ' (верх)';
            case BunType.bottom:
                return ' (низ)';
            default:
                return '';
        }
    }

    const name = part.name + getNameSuffix(part.bunType);

    const iconType = 'primary';
    const dragIcon = (<DragIcon type={iconType}/>);
    const dragIconClass = locked ? styles.hidden : '';
    const actionIcon = locked ? (<LockIcon type='secondary'/>) : (<DeleteIcon type={iconType}/>);
    return (
        <div className={`pt-4 pb-4 mb-4 mr-4 ${styles.item}`}>
            <span className={`mr-8 ${styles.icon} ${dragIconClass}`}>{dragIcon}</span>
            <img src={part.image} alt={part.name} className={`mr-5 ${styles.image}`}/>
            <span className={`mr-5 text text_type_main-default ${styles.name}`}>{name}</span>
            <MoneyCounter sum={part.price}/>
            <span className={`ml-5 mr-5 ${styles.icon}`}>{actionIcon}</span>
        </div>
    );
}