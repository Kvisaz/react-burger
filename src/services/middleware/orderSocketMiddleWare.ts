// socketMiddleware.js

import { IAppStore } from '../store';
import { Middleware } from 'redux';
import { IAppState } from '../model/IAppState';
import { IBurgerActionType } from '../actions';

export const orderSocketMiddleWare = (wsUrl: string) => {
  return (store: IAppStore) => {
    let socket: WebSocket;

    return (next: Middleware<{}, IAppState>) => (action:any) => {
      const { dispatch, getState } = store;
      const { type } = action;

      if (type === IBurgerActionType.WS_CONNECTION_START) {
        // объект класса WebSocket
        socket = new WebSocket(wsUrl);
      }
      if (socket) {

        // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: IBurgerActionType.WS_CONNECTION_SUCCESS, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: IBurgerActionType.WS_CONNECTION_ERROR, error: event });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event;
          const message = JSON.parse(data);
          console.log('socket message', message);
          dispatch({ type: IBurgerActionType.WS_GET_MESSAGE, message });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: IBurgerActionType.WS_CONNECTION_CLOSED, event });
        };

        if (type === IBurgerActionType.WS_SEND_MESSAGE) {
          const message = action.message;
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};