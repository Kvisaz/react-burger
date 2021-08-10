import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import {AppHeader} from "./components/app-header/app-header";
import {BurgerIngredients} from "./components/burger-ingredients/burger-ingredients";
import {
    BurgerConstructor,
    IConstructorElementProps,
    mapBurgerItem
} from "./components/burger-constructor/burger-constructor";
import {Api} from "./service/Api";
import {AppContext} from "./service/AppContext";
import {IBurgerPart} from "./model/IBurgerPart";
import {IAppState} from "./model/IAppState";
import {IConstructorElementType} from "./model/IConstructorElementData";

const API = new Api();

function App() {
    const [state, setState] = useState<IAppState>({
        sum: 0,
        loaded: false,
        ingredients: [],
        selectedBun: undefined,
        selectedParts: [],
    });

    useEffect(() => {
        if (state.loaded) return;
        let ingredients: IBurgerPart[] = [];
        let selectedParts: IConstructorElementProps[] = [];
        let bun: IConstructorElementProps;
        API.getBurgerParts()
            .then(({data, error}) => {
                if (error) {
                    console.warn(error);
                } else {
                    ingredients = data;

                    // test only
                    const buns = data.filter(i => i.type === 'bun');
                    const notBuns = data.filter(i => i.type !== 'bun');
                    selectedParts = [
                        ...notBuns.map(i => mapBurgerItem(i))
                    ];

                    if (buns.length > 0) {
                        bun = {
                            ...mapBurgerItem(buns[0]),
                            isLocked: true
                        };
                    }

                }

                const sum = bun.price * 2 + selectedParts.reduce((acc, next) => acc + next.price, 0);

                setState(prevState => ({
                    ...prevState,
                    sum,
                    ingredients,
                    selectedParts,
                    selectedBun: bun,
                    loaded: true
                }));
            });
    });

    return (
        <AppContext.Provider value={state}>
            <div className={styles.App}>
                <AppHeader/>
                <main className={styles.content}>
                    <div className={styles.col_left}>
                        <span className='text text_type_main-large'>Соберите бургер</span>
                        <BurgerIngredients/>
                    </div>
                    <div className={styles.col_right}>
                        <BurgerConstructor/>
                    </div>
                </main>
            </div>
        </AppContext.Provider>
    );
}

export default App;
