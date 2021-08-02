import React from 'react';
import styles from './burger-constructor.module.css';
import {BurgerConstructorOrder} from './components/burger-constructor-order/burger-constructor-order';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

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
    top?: IConstructorElementProps;
    parts: IConstructorElementProps[];
    bottom?: IConstructorElementProps;
    onOrderButtonClick: ()=>void;
}

const IConstructorElementPropTypes = PropTypes.exact({
    _id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['top', 'bottom']),
    isLocked: PropTypes.bool,
    handleClose: PropTypes.func,
    text: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
})

BurgerConstructor.propTypes = {
    top: IConstructorElementPropTypes,
    parts: PropTypes.arrayOf(IConstructorElementPropTypes),
    bottom: IConstructorElementPropTypes,
    onOrderButtonClick: PropTypes.func
};

export function BurgerConstructor({top, parts, bottom, onOrderButtonClick}: IBurgerIngredientsProps) {

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
                <BurgerConstructorOrder sum={100} onClick={onOrderButtonClick}/>
            </div>
        </section>
    );
}