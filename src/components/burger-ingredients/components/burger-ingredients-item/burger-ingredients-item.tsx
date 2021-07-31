import React, {useCallback, useState} from 'react';
import styles from './burger-ingredients-item.module.css';
import {IBurgerPart} from '../../../../model/IBurgerPart';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {MoneyCounter} from '../../../common/money-counter/money-counter';
import {Modal} from '../../../common/modal/modal';
import {IngredientDetails} from '../ingredient-details/ingredient-details';

interface IBurgerConstructorItemProps {
    part: IBurgerPart;
    amount?: number;
}

export function BurgerIngredientsItem({part, amount = 0}: IBurgerConstructorItemProps) {

    const [modal, showModal] = useState(false);

    const onShowClick = useCallback(() => {
        if(modal) return;
        showModal(true);
    }, [modal]);

    const onHideClick = useCallback(() => {
        showModal(false);
    }, []);

    const hasAmount = amount > 0;
    const counter = hasAmount ? (<Counter count={amount} size='default'/>) : null;
    return (
        <div className={styles.item} onClick={onShowClick}>
            <img src={part.image} alt={part.name} className={styles.image}/>
            <MoneyCounter sum={part.price}/>
            <div className={`text text_type_main-default ${styles.name}`}>{part.name}</div>
            {counter}
            <Modal visible={modal} title={'Детали ингредиента'} onHide={onHideClick}>
                <IngredientDetails  {...part}  image={part.image_large}/>
            </Modal>
        </div>
    )
}