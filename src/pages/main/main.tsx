import React from 'react';
import styles from './main.module.css';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {BurgerIngredients} from '../../components/burger-ingredients/burger-ingredients';
import {BurgerConstructor} from '../../components/burger-constructor/burger-constructor';
import {DndProvider} from 'react-dnd';

export function Main() {
    return (<DndProvider backend={HTML5Backend}>
        <main className={styles.content}>
            <div className={styles.col_left}>
                <span className='text text_type_main-large'>Соберите бургер</span>
                <BurgerIngredients/>
            </div>
            <div className={styles.col_right}>
                <BurgerConstructor/>
            </div>
        </main>
    </DndProvider>)
}