import React from 'react';
import {Route} from 'react-router-dom';
import {RouteProps} from 'react-router';

interface IExactRouteProps extends RouteProps {}

export function ExactRoute(props: IExactRouteProps) {
    return (
        <Route exact={true} {...props}>{props.children}</Route>
    )
}