import React from 'react';
import {RouteProps} from 'react-router';
import {Redirect, Route} from 'react-router-dom';
import {Routes} from '../../../services/Routes';
import {useAuth} from '../../../services/hooks/useAuth';

interface IProtectedRouteProps extends RouteProps {
}

export function ProtectedRoute({children, ...rest}: IProtectedRouteProps) {

    const {isAuthorized} = useAuth();

    return (<Route {...rest} render={() =>
        isAuthorized ? (children)
            : (<Redirect to={Routes.login}/>)
    }/>);
}