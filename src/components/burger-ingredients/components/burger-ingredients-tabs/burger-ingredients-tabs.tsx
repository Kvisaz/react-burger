import React from 'react';
import styles from './burger-ingredients-tabs.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

export interface IBurgerConstructorTabsProps {
    onPageSelect?: (page: string) => void;
}

export enum ITabsPage {
    buns = 'Булки',
    sauces = 'Соусы',
    fills = 'Начинки'
}

BurgerIngredientsTabs.propTypes = {
    onPageSelect: PropTypes.func
};

export function BurgerIngredientsTabs({onPageSelect}: IBurgerConstructorTabsProps) {
    const [current, setCurrent] = React.useState(Object.keys(ITabsPage)[0])

    const onClick = (value: string) => {
        setCurrent(value);
        if (onPageSelect) onPageSelect(value);
    }

    return (
        <div className={`mt-5 ${styles.main}`}>
            {
                Object.entries(ITabsPage).map(([key, text], index) => (
                    <Tab key={index} value={key} active={current === key} onClick={() => onClick(key)}>
                        {text}
                    </Tab>
                ))
            }
        </div>
    )
}