import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import {AppHeader} from "./components/app-header/app-header";
import {BurgerConstructor} from "./components/burger-constructor/burger-constructor";
import {BurgerIngredients} from "./components/burger-ingredients/burger-ingredients";
import {Api} from "./service/Api";
import {IBurgerPart} from "./model/IBurgerPart";
import {BunType, ISelectedBurgerPart} from './model/ISelectedBurgerPart';

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
        let selected: ISelectedBurgerPart[] = [];
        API.getBurgerParts()
            .then(({data, error}) => {
                if (error) {
                    console.warn(error);
                } else {
                    parts = data;

                    // test only
                    const buns = data.filter(i => i.type === 'bun');
                    const notBuns = data.filter(i => i.type !== 'bun');
                    selected = [
                        ...notBuns
                    ];

                    if (buns.length > 0) selected.unshift({
                        ...buns[0],
                        bunType: BunType.top,
                        locked: true
                    });
                    if (buns.length > 1) selected.push({
                        ...buns[1],
                        bunType: BunType.bottom,
                        locked: true
                    });

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
