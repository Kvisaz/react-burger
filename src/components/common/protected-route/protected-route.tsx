import React, { useEffect } from 'react';
import { RouteProps } from 'react-router';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { Routes } from '../../../services/Routes';
import { MainActionType } from '../../../services/actions';
import { useMainState } from '../../../services/hooks/useMainState';
import { useAppDispatch } from '../../../services/hooks/useAppDispatch';

interface IProtectedRouteProps extends RouteProps {
}

export function ProtectedRoute({ children, ...rest }: IProtectedRouteProps) {

  const { isAuthorized } = useMainState();
  const location = useLocation();

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isAuthorized) dispatch({ type: MainActionType.SAVE_AFTER_LOGGING_URL, url: location.pathname });
  }, [isAuthorized, dispatch, location.pathname]);

  return (<Route {...rest} render={() =>
    isAuthorized ? (children)
      : (<Redirect to={Routes.login} />)
  } />);
}