import React, { useEffect } from 'react';
import { RouteProps } from 'react-router';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { Routes } from '../../../services/Routes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../services/store';
import { IBurgerActionType } from '../../../services/actions';

interface IProtectedRouteProps extends RouteProps {
}

export function ProtectedRoute({ children, ...rest }: IProtectedRouteProps) {

	const { isAuthorized } = useSelector((state: RootState) => ({ ...state }));
	const location = useLocation();

	const dispatch = useDispatch();
	useEffect(() => {
		if (!isAuthorized) dispatch({ type: IBurgerActionType.SAVE_AFTER_LOGGING_URL, url: location.pathname });
	}, [isAuthorized, dispatch, location.pathname]);

	return (<Route {...rest} render={() =>
		isAuthorized ? (children)
			: (<Redirect to={Routes.login} />)
	} />);
}