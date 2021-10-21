import React from 'react';
import styles from './main.module.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { DndProvider } from 'react-dnd';
import { OrderBasket } from '../../components/order-basket/order-basket';

export function Main() {
  return (<DndProvider backend={HTML5Backend}>
    <main className={styles.content}>
      <div className={styles.col_left}>
        <span className='text text_type_main-large'>Соберите бургер</span>
        <BurgerIngredients />
      </div>
      <div className={styles.col_right}>
        <OrderBasket />
      </div>
    </main>
  </DndProvider>);
}