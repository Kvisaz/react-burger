import React from 'react';
import styles from 'burger-constructor-tabs.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

export interface IBurgerConstructorTabsProps {
    onPageSelect?: (page: string) => void;
}

export enum ITabsPage {
    buns = 'Булки',
    sauces = 'Соусы',
    fills = 'Начинки'
}

export function BurgerConstructorTabs({onPageSelect}: IBurgerConstructorTabsProps) {
    const [current, setCurrent] = React.useState(Object.keys(ITabsPage)[0])

    const onClick = (value: string) => {
        setCurrent(value);
        if (onPageSelect) onPageSelect(value);
    }

    return (
        <div style={{display: 'flex'}}>
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