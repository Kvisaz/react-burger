// socketMiddleware.js

import { IBurgerActionType } from '../actions';


export interface IWSActions extends Record<string, IBurgerActionType> {
  wsInit: IBurgerActionType;
  wsSendMessage: IBurgerActionType;
  onOpen: IBurgerActionType;
  onClose: IBurgerActionType;
  onError: IBurgerActionType;
  onMessage: IBurgerActionType;
}

export const orderSocketMiddleWare = (wsUrl: string, wsActions: IWSActions) => {
  return (store: any) => {
    let socket: WebSocket;

    const { wsInit, wsSendMessage, onMessage, onClose, onError, onOpen } = wsActions;

    return (next: any) => (action: any) => {
      const { dispatch, getState } = store;
      const { type } = action;

      if (type === wsInit) {
        const url = `${wsUrl}?token=${action.token}`;
        socket = new WebSocket(url);
      }
      if (socket) {

        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, error: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const message = JSON.parse(data);
          console.log('socket message', message);
          dispatch({ type: onMessage, orderFeed: message });
        };
        socket.onclose = event => {
          dispatch({ type: onClose, event });
        };

        if (type === wsSendMessage) {
          const message = action.message;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};