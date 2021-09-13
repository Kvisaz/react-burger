import React, { useEffect } from 'react';
import { RouteProps } from 'react-router';
import { Redirect, Route, useLocation, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../services/store';
import { Routes } from '../../../services/Routes';
import { checkAuth, IBurgerActionType } from '../../../services/actions';
import { Loading } from '../../loading/loading';

interface IProtectedRouteProps extends RouteProps {
}

export function ProtectedRoute({ children, ...rest }: IProtectedRouteProps) {

	const {
		isAuthorized,
		isAuthorizationChecking,
		isNoRefreshToken,
	} = useSelector((state: RootState) => ({ ...state }));
	const dispatch = useDispatch();

	const location = useLocation();

	useEffect(() => {
		if (!isAuthorized) {
			dispatch({ type: IBurgerActionType.SAVE_AFTER_LOGGING_URL, url: location.pathname });
		}
		if (!isAuthorized && isNoRefreshToken != true) dispatch(checkAuth());
	}, []);

	return (<Route {...rest} render={() =>
		isAuthorized && (children) ||
		!isAuthorized && isAuthorizationChecking && (<Loading />) ||
		!isAuthorized && !isAuthorizationChecking && (<Redirect to={Routes.login} />)


	} />);
}