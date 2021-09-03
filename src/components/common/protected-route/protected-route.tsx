import React from 'react';
import {RouteProps} from 'react-router';
import {Route} from 'react-router-dom';

interface IProtectedRouteProps extends RouteProps {
}

export function ProtectedRoute(props: IProtectedRouteProps) {
    return (<Route {...props}>{props.children}</Route>)
}