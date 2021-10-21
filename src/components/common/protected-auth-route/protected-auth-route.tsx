import React from 'react';
import { RouteProps } from 'react-router';
import { Redirect, Route } from 'react-router-dom';
import { Routes } from '../../../services/Routes';
import { useMainState } from '../../../services/hooks/useMainState';

export function ProtectedAuthRoute({ children, ...rest }: RouteProps) {

  const { isAuthorized, urlAfterLogging } = useMainState();

  return (<Route {...rest} render={() =>
    isAuthorized ? (<Redirect to={urlAfterLogging || Routes.main} />) : (children)
  } />);
}