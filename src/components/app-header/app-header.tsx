import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {AppHeaderItem, ICON} from "./components/app-header-item/app-header-item";
import styles from './app-header.module.css';

export function AppHeader() {
    const className = `${styles.header} mt-4 mb-4`;
    return (
        <nav className={className}>
            <span className={styles.left}>
                <AppHeaderItem text='Конструктор' icon={ICON.Burger} active />
                <AppHeaderItem text='Лента заказов' icon={ICON.List}/>
            </span>
            <span className={styles.center}>
                <Logo/>
            </span>
            <span className={styles.right}>
                <AppHeaderItem text='Личный кабинет' icon={ICON.Person}/>
            </span>
        </nav>
    )
}