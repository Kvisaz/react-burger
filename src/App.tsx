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

const API = new Api();


function App() {
    const [state, setState] = useState<IAppState>({
        loaded: false,
        ingredients: [],
        selectedTop: undefined,
        selectedParts: [],
        selectedBottom: undefined,
    });

    useEffect(() => {
        if (state.loaded) return;
        let ingredients: IBurgerPart[] = [];
        let selectedParts: IConstructorElementProps[] = [];
        let selectedTop: IConstructorElementProps;
        let selectedBottom: IConstructorElementProps;
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
                        selectedTop = {
                            ...mapBurgerItem(buns[0], ' (верх)'),
                            type: 'top',
                            isLocked: true
                        };
                    }
                    if (buns.length > 1) {
                        selectedBottom = {
                            ...mapBurgerItem(buns[1], ' (низ)'),
                            type: 'bottom',
                            isLocked: true
                        };
                    }

                }
                setState({
                    ingredients,
                    selectedTop,
                    selectedParts,
                    selectedBottom,
                    loaded: true
                });
            });
    });

    const {ingredients, selectedParts, selectedBottom, selectedTop} = state;
    return (
        <AppContext.Provider value={state}>
            <div className={styles.App}>
                <AppHeader/>
                <main className={styles.content}>
                    <div className={styles.col_left}>
                        <span className='text text_type_main-large'>Соберите бургер</span>
                        <BurgerIngredients parts={ingredients}/>
                    </div>
                    <div className={styles.col_right}>
                        <BurgerConstructor parts={selectedParts} bottom={selectedBottom} top={selectedTop}/>
                    </div>
                </main>
            </div>
        </AppContext.Provider>
    );
}

export default App;
