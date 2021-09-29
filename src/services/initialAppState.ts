import { IAppState } from '../model/IAppState';

// todo delete
import MOCK_ORDER_FEED from '../../src/utils/orderFeedMock.json';

export const InitialAppState: IAppState = {
  sum: 0,
  isIngredientsRequest: false,
  isIngredientsFailed: false,
  isIngredientsLoaded: false,
  ingredients: [],
  ingredientAmountMap: {},
  selectedBun: undefined,
  selectedParts: [],
  orderSuccessResults: [],
  orderFeed: [
    ...MOCK_ORDER_FEED
  ],
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
};