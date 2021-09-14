import React from 'react';
import { RouteProps } from 'react-router';
import { Redirect, Route } from 'react-router-dom';
import { Routes } from '../../../services/Routes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/store';

export function ProtectedAuthRoute({ children, ...rest }: RouteProps) {

  const { isAuthorized, urlAfterLogging } = useSelector((state: RootState) => ({ ...state }));

  return (<Route {...rest} render={() =>
    isAuthorized ? (<Redirect to={urlAfterLogging || Routes.main} />) : (children)
  } />);
}