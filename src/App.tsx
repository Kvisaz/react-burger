import React, { useCallback, useEffect, useReducer } from 'react';
import styles from './App.module.css';
import { AppHeader } from './components/app-header/app-header';
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor';
import { Api } from './service/Api';
import { IBurgerPart } from './model/IBurgerPart';
import { Modal } from './components/common/modal/modal';
import { IngredientDetails } from './components/burger-ingredients/components/ingredient-details/ingredient-details';
import { OrderDetails } from './components/burger-constructor/components/order-details/order-details';
import { IConstructorElementData } from './model/IConstructorElementData';
import { AppContext } from './service/AppContext';
import { reducer } from './service/reducer';
import { IBurgerActionType } from './model/IBurgerAction';

const API_END_POINT = 'https://norma.nomoreparties.space/api/ingredients';
const API = new Api(API_END_POINT);


function App() {

	const [state, dispatch] = useReducer(reducer, {
		sum: 0,
		loaded: false,
		ingredients: [],
		selectedBun: undefined,
		selectedParts: [],
		orderId: 2,
	}, undefined);

	const onOrderButtonClick = useCallback(() => {
		if (state.isModalOrderOpen) return;
		dispatch({ type: IBurgerActionType.ORDER_CLICK });
	}, [state.isModalOrderOpen]);

	const onIngredientClick = useCallback((i: IBurgerPart) => {
		if (state.isModalIngredientOpen) return;
		dispatch({ type: IBurgerActionType.INGREDIENT_CLICK, payload: i });
	}, [state.isModalIngredientOpen]);

	const onModalHideClick = useCallback(() => {
		dispatch({ type: IBurgerActionType.CLOSE_MODAL });
	}, []);

	useEffect(() => {
		let ingredients: IBurgerPart[] = [];
		let selectedParts: IConstructorElementData[] = [];
		let selectedBun: IConstructorElementData;
		API.getBurgerParts()
			.then(({ data, error }) => {
					if (error) {
						console.warn(error);
					} else {
						ingredients = data;
						/*const buns = data.filter(i => i.type === 'bun');
						const notBuns = data.filter(i => i.type !== 'bun');
						selectedParts = [
							...notBuns.map(i => mapBurgerItem(i)),
						];

						if (buns.length > 0) {
							selectedBun = {
								...mapBurgerItem(buns[0]),
								isLocked: true,
							};
						}*/

					}

					// const sum = selectedBun.price * 2 + selectedParts.reduce((acc, next) => acc + next.price, 0);
					dispatch({type: IBurgerActionType.DATA_LOADED, payload: ingredients})
		/*			setState((prevState => ({
						...prevState,
						sum,
						ingredients,
						selectedParts,
						selectedBun,
						loaded: true,
					})));*/
				},
			)
			.catch(e => console.error(e));
	}, []);

	return (
		<AppContext.Provider value={state}>
			<div className={styles.App}>
				<AppHeader />
				<main className={styles.content}>
					<div className={styles.col_left}>
						<span className='text text_type_main-large'>Соберите бургер</span>
						<BurgerIngredients onIngredientClick={onIngredientClick} />
					</div>
					<div className={styles.col_right}>
						<BurgerConstructor onOrderButtonClick={onOrderButtonClick} />
					</div>
				</main>
				{
					state.isModalIngredientOpen && state.selectedIngredient && (
						<Modal title={'Детали ингредиента'} onHide={onModalHideClick}>
							<IngredientDetails  {...state.selectedIngredient}
												image={state.selectedIngredient.image_large} />
						</Modal>
					)
				}
				{
					state.isModalOrderOpen && state.orderId != null && (
						<Modal onHide={onModalHideClick}>
							<OrderDetails orderId={state.orderId} />
						</Modal>
					)
				}
			</div>
		</AppContext.Provider>
	);
}

function mapBurgerItem(data: IBurgerPart, suffix = ''): IConstructorElementData {
	return {
		_id: data._id, price: data.price, text: data.name + suffix, thumbnail: data.image,
	};
}

export default App;
