import { IBurgerActionType } from '../actions';
import { logg } from '../utils/log';


export interface IWSActions extends Record<string, IBurgerActionType> {
  wsInit: IBurgerActionType;
  wsSendMessage: IBurgerActionType;
  wsClose: IBurgerActionType;
  onOpen: IBurgerActionType;
  onClose: IBurgerActionType;
  onError: IBurgerActionType;
  onMessage: IBurgerActionType;
}

export const socketMiddleWare = (wsUrl: string, wsActions: IWSActions) => {
  return (store: any) => {
    let socket: WebSocket;

    const { wsInit, wsClose, wsSendMessage, onMessage, onClose, onError, onOpen } = wsActions;

    return (next: any) => (action: any) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === wsInit) {
        const url = `${wsUrl}?token=${action.token}`;
        socket = new WebSocket(url);
      }
      if (socket) {

        if (type === wsClose) {
          logg(' socket.close by client', action);
          socket.close();
        }

        socket.onopen = event => {
          logg(' socket.onopen', event);
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          logg(' socket.onerror', event);
          dispatch({ type: onError, error: event });
        };

        socket.onmessage = event => {
          logg(' socket.onmessage', event);
          const { data } = event;
          const message = JSON.parse(data);
          logg('socket message', message);
          dispatch({ type: onMessage, message });
        };
        socket.onclose = event => {
          dispatch({ type: onClose, event });
        };

        if (type === wsSendMessage) {
          logg(' socket.wsSendMessage', action);
          const message = action.message;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};