import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import {AppHeader} from "./components/app-header/app-header";
import {BurgerIngredients} from "./components/burger-ingredients/burger-ingredients";
import {
    BurgerConstructor,
    IConstructorElementProps,
} from "./components/burger-constructor/burger-constructor";
import {Api} from "./service/Api";
import {IBurgerPart} from "./model/IBurgerPart";

const API_END_POINT = 'https://norma.nomoreparties.space/api/ingredients';
const API = new Api(API_END_POINT);

interface IAppState {
    ingredients: IBurgerPart[];
    selectedTop?: IConstructorElementProps;
    selectedParts: IConstructorElementProps[];
    selectedBottom?: IConstructorElementProps;
    orderId: number;
}

function App() {
    const [state, setState] = useState<IAppState>({
        ingredients: [],
        selectedTop: undefined,
        selectedParts: [],
        selectedBottom: undefined,
        orderId: 34536
    });

    useEffect(() => {
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
                    ...state,
                    ingredients,
                    selectedTop,
                    selectedParts,
                    selectedBottom,
                });
            });
    }, []);

    const {ingredients, selectedParts, selectedBottom, selectedTop} = state;
    return (
        <div className={styles.App}>
            <AppHeader/>
            <main className={styles.content}>
                <div className={styles.col_left}>
                    <span className='text text_type_main-large'>Соберите бургер</span>
                    <BurgerIngredients parts={ingredients}/>
                </div>
                <div className={styles.col_right}>
                    <BurgerConstructor parts={selectedParts} bottom={selectedBottom} top={selectedTop}
                                       orderId={state.orderId}/>
                </div>
            </main>
        </div>
    );
}

function mapBurgerItem(data: IBurgerPart, suffix = ''): IConstructorElementProps {
    return {
        _id: data._id, price: data.price, text: data.name + suffix, thumbnail: data.image
    }
}

export default App;
