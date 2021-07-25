import React from "react";
import {BurgerIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header-item.module.css';

// расставить иконки
// active style
export function AppHeaderItem({text}: IAppHeaderItemProps) {
    const className = `${styles.item} p-5`;
    return (
        <span className={className}>
            <BurgerIcon type="primary"/>
            <span className="text text_type_main-default ml-2">{text}</span>
        </span>
    )
}

interface IAppHeaderItemProps {
    text: string;
    active?: boolean;
}