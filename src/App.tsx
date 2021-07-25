import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import {AppHeader} from "./components/app-header/app-header";
import {BurgerConstructor} from "./components/burger-constructor/burger-constructor";
import {BurgerIngredients} from "./components/burger-ingredients/burger-ingredients";
import {Api} from "./service/Api";
import {IBurgerPart} from "./model/IBurgerPart";


const API = new Api();

function App() {
    const [parts, setParts] = useState<IBurgerPart[]>([]);

    useEffect(() => {
        API.getBurgerParts()
            .then(({data, error}) => {
                if (error) {
                    console.warn(error);
                } else {
                    setParts(data);
                }
            });
    });

    return (
        <div className={styles.App}>
            <AppHeader/>
            <main className={styles.row}>
                <div className={styles.col_left}>
                    <span className='text text_type_main-large'>Соберите бургер</span>
                    <BurgerConstructor parts={parts}/>
                </div>
                <div className={styles.col_right}>
                    <BurgerIngredients/>
                </div>
            </main>
        </div>
    );
}

export default App;
