import React, { useEffect, useReducer } from 'react';
import styles from './App.module.css';
import { AppHeader } from './components/app-header/app-header';
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor';
import { Api } from './service/Api';
import { Modal } from './components/common/modal/modal';
import { IngredientDetails } from './components/burger-ingredients/components/ingredient-details/ingredient-details';
import { OrderDetails } from './components/burger-constructor/components/order-details/order-details';
import { AppContext } from './service/AppContext';
import { reducer } from './service/reducer';
import { IBurgerActionType } from './model/IBurgerAction';

const API_DATA_END_POINT = 'https://norma.nomoreparties.space/api/ingredients';
const API_ORDER_END_POINT = 'https://norma.nomoreparties.space/api/orders';
const API = new Api(API_DATA_END_POINT, API_ORDER_END_POINT);


function App() {

	const [state, dispatch] = useReducer(reducer, {
		sum: 0,
		loaded: false,
		ingredients: [],
		ingredientAmountMap: {},
		selectedBun: undefined,
		selectedParts: [],
		orderId: 2,
		isOrderWaiting: false,
		isOrderClicked: false,
	}, undefined);

	useEffect(() => {
		API.getBurgerParts()
			.then(({ data }) => dispatch({ type: IBurgerActionType.DATA_LOADED, payload: data }))
			.catch(e => console.error(e));
	}, []);


	useEffect(()=>{
		if (state.isOrderClicked && !state.isOrderWaiting) {
			dispatch({ type: IBurgerActionType.ORDER_WAITING });
			const { selectedParts, selectedBun } = state;
			const selectedIds = selectedParts.map(i => i.ingredientId);
			if (selectedBun) {
				selectedIds.push(selectedBun.ingredientId);
				selectedIds.push(selectedBun.ingredientId);
			}
			API.order(selectedIds)
				.then((result) => dispatch({ type: IBurgerActionType.ORDER_SUCCESS, payload: result }))
				.catch(e => console.error(e));
		}
	},[state.isOrderClicked, state.isOrderWaiting])



	return (
		<AppContext.Provider value={{ state, dispatch }}>
			<div className={styles.App}>
				<AppHeader />
				<main className={styles.content}>
					<div className={styles.col_left}>
						<span className='text text_type_main-large'>Соберите бургер</span>
						<BurgerIngredients />
					</div>
					<div className={styles.col_right}>
						<BurgerConstructor />
					</div>
				</main>
				{
					state.isModalIngredientOpen && state.selectedIngredient && (
						<Modal title={'Детали ингредиента'}>
							<IngredientDetails />
						</Modal>
					)
				}
				{
					state.isModalOrderOpen && state.orderId != null && (
						<Modal>
							<OrderDetails />
						</Modal>
					)
				}
			</div>
		</AppContext.Provider>
	);
}

export default App;
