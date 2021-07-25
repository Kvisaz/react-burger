import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {AppHeaderItem} from "./components/app-header-item/app-header-item";
import styles from './app-header.module.css';

export function AppHeader() {
    const className = `${styles.header} mt-4 mb-4`;
    return (
        <nav className={className}>
            <span className={styles.left}>
                <AppHeaderItem text='Конструктор'/>
                <AppHeaderItem text='Лента заказов'/>
            </span>
            <span className={styles.center}>
                <Logo/>
            </span>
            <span className={styles.right}>
                <AppHeaderItem text='Личный кабинет'/>
            </span>
        </nav>
    )
}