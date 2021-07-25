import React from 'react';
import styles from './App.module.css';

import DATA from './utils/data.json';
import {AppHeader} from "./components/app-header/app-header";
import {BurgerConstructor} from "./components/burger-constructor/burger-constructor";
import {BurgerIngredients} from "./components/burger-ingredients/burger-ingredients";

console.log('DATA', DATA);

function App() {
    return (
        <div className={styles.App}>
            <AppHeader/>
            <main className={styles.row}>
                <div className={styles.col_left}>
                    <span className='text text_type_main-large'>Соберите бургер</span>
                    <BurgerConstructor/>
                </div>
                <div className={styles.col_right}>
                    <BurgerIngredients/>
                </div>
            </main>
        </div>
    );
}

export default App;
