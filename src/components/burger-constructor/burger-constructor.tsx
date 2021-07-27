import React from 'react';
import styles from './burger-constructor.module.css';
import {BurgerConstructorOrder} from './components/burger-constructor-order/burger-constructor-order';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {IBurgerPart} from '../../model/IBurgerPart';

export interface IConstructorElementProps {
    _id: string;
    type?: 'top' | 'bottom';
    isLocked?: boolean;
    handleClose?: () => void;
    text: string;
    thumbnail: string;
    price: number;
}

export function mapBurgerItem(data: IBurgerPart, suffix = ''): IConstructorElementProps {
    return {
        _id: data._id, price: data.price, text: data.name + suffix, thumbnail: data.image
    }
}

interface IBurgerIngredientsProps {
    top?: IConstructorElementProps,
    parts: IConstructorElementProps[],
    bottom?: IConstructorElementProps,
}

export function BurgerConstructor({top, parts, bottom}: IBurgerIngredientsProps) {
    return (
        <section className={`mt-4 mb-4 ${styles.main}`}>
            {top && <ConstructorElement key={top._id} {...top} />}
            <div className={`mt-4 mb-4 ${styles.list}`}>
                {parts.map(props => (
                    <ConstructorElement key={props._id} {...props} />
                ))}
            </div>
            {bottom && <ConstructorElement key={bottom._id} {...bottom} />}
            <div className={`mt-10 mb-10 ${styles.sum}`}>
                <BurgerConstructorOrder sum={100}/>
            </div>
        </section>
    );
}