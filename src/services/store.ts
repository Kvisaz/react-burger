import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { IAppState } from '../model/IAppState';
import { reducer } from './reducers/reducer';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
export const AppStore = createStore(reducer, enhancer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof AppStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof AppStore.dispatch


export interface IGetState {
	(): IAppState
}