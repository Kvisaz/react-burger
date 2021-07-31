import React, {useCallback, useState} from 'react';
import styles from './burger-constructor.module.css';
import {BurgerConstructorOrder} from './components/burger-constructor-order/burger-constructor-order';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {Modal} from '../common/modal/modal';
import {OrderDetails} from './components/order-details/order-details';

export interface IConstructorElementProps {
    _id: string;
    type?: 'top' | 'bottom';
    isLocked?: boolean;
    handleClose?: () => void;
    text: string;
    thumbnail: string;
    price: number;
}

interface IBurgerIngredientsProps {
    orderId: number;
    top?: IConstructorElementProps,
    parts: IConstructorElementProps[],
    bottom?: IConstructorElementProps,
}

export function BurgerConstructor({top, parts, bottom, orderId}: IBurgerIngredientsProps) {

    const [modal, showModal] = useState(false);

    const onShowClick = useCallback(() => {
        if (modal) return;
        showModal(true);
    }, [modal]);

    const onHideClick = useCallback(() => {
        showModal(false);
    }, []);

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
                <BurgerConstructorOrder sum={100} onClick={onShowClick}/>
            </div>
            <Modal visible={modal} onHide={onHideClick}>
                <OrderDetails orderId={orderId}/>
            </Modal>
        </section>
    );
}