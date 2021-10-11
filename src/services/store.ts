import { applyMiddleware, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { IMainState, IRootState, rootReducer } from './reducers';
import { BurgerAction, IBurgerActionType } from './actions';
import { IWSActions, socketMiddleWare } from './middleware/socketMiddleWare';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const WS_ORDER_URL = 'wss://norma.nomoreparties.space/orders/all';
const wsActions: IWSActions = {
  wsInit: IBurgerActionType.WS_ORDER_CONNECTION_START,
  wsClose: IBurgerActionType.WS_ORDER_CONNECTION_CLOSE,
  onOpen: IBurgerActionType.WS_ORDER_CONNECTION_SUCCESS,
  onError: IBurgerActionType.WS_ORDER_CONNECTION_ERROR,
  onMessage: IBurgerActionType.WS_ORDER_GET_MESSAGE,
  wsSendMessage: IBurgerActionType.WS_ORDER_SEND_MESSAGE,
  onClose: IBurgerActionType.WS_ORDER_CONNECTION_CLOSED,
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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof AppStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof AppStore.dispatch

export interface IAppStore extends Store<IMainState, BurgerAction> {
}

export interface IGetState {
  (): IRootState;
}