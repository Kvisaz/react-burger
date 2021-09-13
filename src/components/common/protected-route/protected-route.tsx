import React from 'react';
import { RouteProps } from 'react-router';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/store';
import { Routes } from '../../../services/Routes';

interface IProtectedRouteProps extends RouteProps {
}

export function ProtectedRoute({ children, ...rest }: IProtectedRouteProps) {

	const { isAuthorized, isAuthorizationChecking } = useSelector((state: RootState) => ({ ...state }));


	return (<Route {...rest} render={() =>
		isAuthorized
			? (children)
			: (<Redirect to={Routes.login} />)
	} />);
}