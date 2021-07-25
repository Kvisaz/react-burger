import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import {AppHeader} from "./components/app-header/app-header";
import {BurgerConstructor} from "./components/burger-constructor/burger-constructor";
import {BurgerIngredients} from "./components/burger-ingredients/burger-ingredients";
import {Api} from "./service/Api";
import {IBurgerPart} from "./model/IBurgerPart";

const API = new Api();

interface IAppState {
    loaded: boolean;
    parts: IBurgerPart[];
    selected: IBurgerPart[];
}

function App() {
    const [state, setState] = useState<IAppState>({loaded: false, parts: [], selected: []});

    useEffect(() => {
        if (state.loaded) return;
        let parts: IBurgerPart[] = [];
        let selected: IBurgerPart[] = [];
        API.getBurgerParts()
            .then(({data, error}) => {
                if (error) {
                    console.warn(error);
                } else {
                    parts = data;
                    selected = (data.slice(0, 7)); // test only
                }
                setState({
                    parts,
                    selected,
                    loaded: true
                });
            });
    });

    const {parts, selected} = state;
    return (
        <div className={styles.App}>
            <AppHeader/>
            <main className={styles.content}>
                <div className={styles.col_left}>
                    <span className='text text_type_main-large'>Соберите бургер</span>
                    <BurgerConstructor parts={parts}/>
                </div>
                <div className={styles.col_right}>
                    <BurgerIngredients parts={selected}/>
                </div>
            </main>
        </div>
    );
}

export default App;
