import { IMainState } from './IMainState';


export const InitialAppState: IMainState = {
  sum: 0,
  // isIngredientsFailed: false,
  // isIngredientsLoaded: false,
  // ingredients: [],
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