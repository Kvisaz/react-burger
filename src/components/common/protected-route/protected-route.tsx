import React, {useEffect, useMemo} from 'react';
import {RouteProps} from 'react-router';
import {Redirect, Route, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../services/store';
import {Routes} from '../../../services/Routes';
import {checkAuth, IBurgerActionType} from '../../../services/actions';

interface IProtectedRouteProps extends RouteProps {
}

export function ProtectedRoute({children, ...rest}: IProtectedRouteProps) {

    const {
        isAuthorized,
        isAuthorizationChecking,
    } = useSelector((state: RootState) => ({...state}));
    const dispatch = useDispatch();

    const location = useLocation();

    const isAuthStart = useMemo(() => !isAuthorized && !isAuthorizationChecking,
        [isAuthorized, isAuthorizationChecking])

    useEffect(() => {
        if (!isAuthorized) dispatch({type: IBurgerActionType.SAVE_AFTER_LOGGING_URL, url: location.pathname});
        if (isAuthStart) dispatch(checkAuth());
    }, [isAuthStart, isAuthorized, dispatch, location.pathname]);

    return (<Route {...rest} render={() =>
        isAuthorized ? (children)
            : (<Redirect to={Routes.login}/>)
    }/>);
}