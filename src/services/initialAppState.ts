import { IAppState } from './model/IAppState';


export const InitialAppState: IAppState = {
  sum: 0,
  isIngredientsRequest: false,
  isIngredientsFailed: false,
  isIngredientsLoaded: false,
  ingredients: [],
  ingredientAmountMap: {},
  selectedBun: undefined,
  selectedParts: [],
  orderFeed: [],
  orderTotal: 0,
  orderToday: 0,
  isOrderRequest: false,
  isOrderFailed: false,
  isOrderSuccess: false,
  currentTabIndex: 0,
  tabs: [
    {
      name: 'Булки',
    },
    {
      name: 'Соусы',
    },
    {
      name: 'Начинки',
    },
  ],
  showedOrders: []
};