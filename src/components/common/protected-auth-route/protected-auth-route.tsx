import React from 'react';
import {RouteProps} from 'react-router';
import {Redirect, Route} from 'react-router-dom';
import {Routes} from '../../../services/Routes';
import {useAuth} from '../../../services/hooks/useAuth';

export function ProtectedAuthRoute({children, ...rest}: RouteProps) {

    const {isAuthorized} = useAuth();

    return (<Route {...rest} render={() =>
        isAuthorized ? (<Redirect to={Routes.main}/>) : (children)
    }/>);
}