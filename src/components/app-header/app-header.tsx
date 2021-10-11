import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { AppHeaderItem, ICON } from './components/app-header-item/app-header-item';
import styles from './app-header.module.css';
import { Routes } from '../../services/Routes';
import { Link } from 'react-router-dom';

export function AppHeader() {
  const className = `${styles.header} mt-4 mb-4`;
  return (
    <header>
      <nav className={className}>
            <span className={styles.left}>
                <AppHeaderItem text='Конструктор' icon={ICON.Burger} to={Routes.main} />
                <AppHeaderItem text='Лента заказов' icon={ICON.List} to={Routes.orderFeed} />
            </span>
        <span className={styles.center}>
          <Link className={styles.link} to={Routes.main}><Logo /></Link>
            </span>
        <span className={styles.right}>
                <AppHeaderItem text='Личный кабинет' icon={ICON.Person} to={Routes.profile} />
            </span>
      </nav>
    </header>
  );
}