import React from 'react';
import {RouteProps} from 'react-router';
import {ExactRoute} from '../exact-route/exact-route';

interface IProtectedRouteProps extends RouteProps {
}

export function ProtectedRoute(props: IProtectedRouteProps) {
    return (<ExactRoute {...props}>props.children</ExactRoute>)
}