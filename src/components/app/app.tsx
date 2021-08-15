import React from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from '../common/modal/modal';
import { IngredientDetails } from '../burger-ingredients/components/ingredient-details/ingredient-details';
import { OrderDetails } from '../burger-constructor/components/order-details/order-details';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';


function App() {
	const state = useSelector((state:RootState) => ({ ...state.main }));
	
	return (
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
	);
}

export default App;
