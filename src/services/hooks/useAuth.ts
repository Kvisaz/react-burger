import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {useLocation} from 'react-router-dom';
import {useEffect, useMemo} from 'react';
import {checkAuth, IBurgerActionType} from '../actions';

export function useAuth() {
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

    return {
        isAuthorized
    }
}