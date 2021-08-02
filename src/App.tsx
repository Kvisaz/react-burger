import React, {useCallback, useEffect, useState} from 'react';
import styles from './App.module.css';
import {AppHeader} from "./components/app-header/app-header";
import {BurgerIngredients} from "./components/burger-ingredients/burger-ingredients";
import {
    BurgerConstructor,
    IConstructorElementProps,
} from "./components/burger-constructor/burger-constructor";
import {Api} from "./service/Api";
import {IBurgerPart} from "./model/IBurgerPart";
import {Modal} from './components/common/modal/modal';
import {IngredientDetails} from './components/burger-ingredients/components/ingredient-details/ingredient-details';
import {OrderDetails} from './components/burger-constructor/components/order-details/order-details';

const API_END_POINT = 'https://norma.nomoreparties.space/api/ingredients';
const API = new Api(API_END_POINT);

interface IAppState {
    ingredients: IBurgerPart[];
    selectedTop?: IConstructorElementProps;
    selectedParts: IConstructorElementProps[];
    selectedBottom?: IConstructorElementProps;
    ingredient?: IBurgerPart;
    isIngredientOpen?: boolean;
    orderId: number;
    isOrderOpen?: boolean;
}

function App() {
    const [state, setState] = useState<IAppState>({
        ingredients: [],
        selectedTop: undefined,
        selectedParts: [],
        selectedBottom: undefined,
        orderId: 34536
    });

    const onOrderButtonClick = useCallback(() => {
        if (state.isOrderOpen) return;
        setState((prevState => ({
            ...prevState,
            isOrderOpen: true
        })))
    }, [state.isOrderOpen]);

    const onIngredientClick = useCallback((i: IBurgerPart) => {
        if (state.isIngredientOpen) return;
        setState((prevState => ({
            ...prevState,
            isIngredientOpen: true,
            ingredient: i
        })))
    }, [state.isIngredientOpen]);

    const onModalHideClick = useCallback(() => {
        setState((prevState => ({
            ...prevState,
            isIngredientOpen: false,
            isOrderOpen: false,
        })))
    }, []);

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
                setState((prevState => ({
                    ...prevState,
                    ingredients,
                    selectedTop,
                    selectedParts,
                    selectedBottom,
                })))
            })
            .catch(e => console.error(e))
    }, []);

    const {ingredients, selectedParts, selectedBottom, selectedTop} = state;
    return (
        <div className={styles.App}>
            <AppHeader/>
            <main className={styles.content}>
                <div className={styles.col_left}>
                    <span className='text text_type_main-large'>Соберите бургер</span>
                    <BurgerIngredients parts={ingredients} onIngredientClick={onIngredientClick}/>
                </div>
                <div className={styles.col_right}>
                    <BurgerConstructor parts={selectedParts} bottom={selectedBottom} top={selectedTop}
                                       onOrderButtonClick={onOrderButtonClick}/>
                </div>
            </main>
            {
                state.isIngredientOpen && state.ingredient && (
                    <Modal title={'Детали ингредиента'} onHide={onModalHideClick}>
                        <IngredientDetails  {...state.ingredient} image={state.ingredient.image_large}/>
                    </Modal>
                )
            }
            {
                state.isOrderOpen && state.orderId && (
                    <Modal onHide={onModalHideClick}>
                        <OrderDetails orderId={state.orderId}/>
                    </Modal>
                )
            }
        </div>
    );
}

function mapBurgerItem(data: IBurgerPart, suffix = ''): IConstructorElementProps {
    return {
        _id: data._id, price: data.price, text: data.name + suffix, thumbnail: data.image
    }
}

export default App;
