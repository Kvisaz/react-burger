import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { IRootState, rootReducer } from './reducers';
import { IngredientAction, MainAction, OrderAction, OrderActionActionType } from './actions';
import { IWSActions, socketMiddleWare } from './middleware/socketMiddleWare';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const WS_ORDER_URL = 'wss://norma.nomoreparties.space/orders/all';
const wsActions: IWSActions = {
  wsInit: OrderActionActionType.WS_ORDER_CONNECTION_START,
  wsClose: OrderActionActionType.WS_ORDER_CONNECTION_CLOSE,
  onOpen: OrderActionActionType.WS_ORDER_CONNECTION_SUCCESS,
  onError: OrderActionActionType.WS_ORDER_CONNECTION_ERROR,
  onMessage: OrderActionActionType.ORDERS_FEED_UPDATE,
  wsSendMessage: OrderActionActionType.WS_ORDER_SEND_MESSAGE,
  onClose: OrderActionActionType.WS_ORDER_CONNECTION_CLOSED,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const AppStore = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      socketMiddleWare(WS_ORDER_URL, wsActions),
    ),
  ));

type AppAction = MainAction | OrderAction | IngredientAction;

export type RootState = ReturnType<typeof AppStore.getState>
export type AppDispatch = typeof AppStore.dispatch;


export interface IGetState {
  (): IRootState;
}