import React, { useCallback, useEffect, useState } from 'react';
import styles from './App.module.css';
import { AppHeader } from './components/app-header/app-header';
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor';
import { Api } from './service/Api';
import { IBurgerPart } from './model/IBurgerPart';
import { Modal } from './components/common/modal/modal';
import { IngredientDetails } from './components/burger-ingredients/components/ingredient-details/ingredient-details';
import { OrderDetails } from './components/burger-constructor/components/order-details/order-details';
import { IAppState } from './model/IAppState';
import { IConstructorElementData } from './model/IConstructorElementData';
import { AppContext } from './service/AppContext';

const API_END_POINT = 'https://norma.nomoreparties.space/api/ingredients';
const API = new Api(API_END_POINT);


function App() {
	const [state, setState] = useState<IAppState>({
		sum: 0,
		loaded: false,
		ingredients: [],
		selectedBun: undefined,
		selectedParts: [],
		orderId: 2
	});

	const onOrderButtonClick = useCallback(() => {
		console.log('onOrderButtonClick!');
		if (state.isModalOrderOpen) return;
		setState((prevState => ({
			...prevState,
			isModalOrderOpen: true,
		})));
	}, [state.isModalOrderOpen]);

	const onIngredientClick = useCallback((i: IBurgerPart) => {
		if (state.isModalIngredientOpen) return;
		setState((prevState => ({
			...prevState,
			isModalIngredientOpen: true,
			selectedIngredient: i,
		})));
	}, [state.isModalIngredientOpen]);

	const onModalHideClick = useCallback(() => {
		setState((prevState => ({
			...prevState,
			isModalIngredientOpen: false,
			isModalOrderOpen: false,
		})));
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
						const buns = data.filter(i => i.type === 'bun');
						const notBuns = data.filter(i => i.type !== 'bun');
						selectedParts = [
							...notBuns.map(i => mapBurgerItem(i)),
						];

						if (buns.length > 0) {
							selectedBun = {
								...mapBurgerItem(buns[0]),
								isLocked: true,
							};
						}

					}

					const sum = selectedBun.price * 2 + selectedParts.reduce((acc, next) => acc + next.price, 0);
					setState((prevState => ({
						...prevState,
						sum,
						ingredients,
						selectedParts,
						selectedBun,
						loaded: true,
					})));
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
					state.isModalOrderOpen && state.orderId && (
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
