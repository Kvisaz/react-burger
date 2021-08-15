import React, { useEffect, useReducer } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';

import { Api } from '../../services/Api';
import { Modal } from '../common/modal/modal';
import { IngredientDetails } from '../burger-ingredients/components/ingredient-details/ingredient-details';
import { OrderDetails } from '../burger-constructor/components/order-details/order-details';
import { AppContext } from '../../services/AppContext';
import { reducer } from '../../services/reducer';
import { IBurgerActionType } from '../../model/IBurgerAction';
import { InitialAppState } from '../../services/initialAppState';

const API_DATA_END_POINT = 'https://norma.nomoreparties.space/api/ingredients';
const API_ORDER_END_POINT = 'https://norma.nomoreparties.space/api/orders';
const API = new Api(API_DATA_END_POINT, API_ORDER_END_POINT);


function App() {
	const [state, dispatch] = useReducer(reducer, InitialAppState, undefined);

	useEffect(()=>{
		if (state.isOrderClicked && !state.isOrderWaiting) {
			dispatch({ type: IBurgerActionType.ORDER_WAITING });
			const selectedBun = state.selectedBun;
			const selectedIds = state.selectedParts.map(i => i.ingredientId);
			if (selectedBun) {
				selectedIds.push(selectedBun.ingredientId);
				selectedIds.push(selectedBun.ingredientId);
			}
			API.order(selectedIds)
				.then((result) => dispatch({ type: IBurgerActionType.ORDER_SUCCESS, payload: result }))
				.catch(e => console.error(e));
		}
	},[state.isOrderClicked, state.isOrderWaiting, state.selectedParts, state.selectedBun])



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
