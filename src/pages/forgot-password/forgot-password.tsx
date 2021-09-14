import React, {useCallback, useEffect} from 'react';
import styles from './forgot-password.module.css';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, useHistory} from 'react-router-dom';
import {Routes} from '../../services/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {IBurgerActionType, restorePassActionCreator} from '../../services/actions';
import {RootState} from '../../services/store';

export function ForgotPassword() {

    const {userRestoreEmail: email = '', isRestoreSuccess} = useSelector((state: RootState) => ({...state}));

    const dispatch = useDispatch();
    const history = useHistory();

    const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist(); // deprecated since React 17
        dispatch({type: IBurgerActionType.RESTORE_PAGE_CHANGE, email: e.target.value})
    }, [dispatch])

    const onButtonClick = useCallback(() => {
        dispatch(restorePassActionCreator({email}))
    }, [dispatch, email])

    useEffect(() => {
        if (isRestoreSuccess) {
            history.replace({
                pathname: Routes.resetPassword,
                state: {}
            });
            return;
        }
    }, [history, isRestoreSuccess])

    return (<div className={styles.wrap}>
        <div className={styles.content}>
            <div className={`text text_type_main-medium ${styles.label}`}>Восстановление пароля</div>
            <Input type={'email'} placeholder={'Укажите email'} value={email} onChange={onEmailChange}/>
            <Button onClick={onButtonClick} size={'medium'} type={'primary'}>Восстановить</Button>
            <div className={`text text_type_main-small ${styles.about}`}>
                <div>Вспомнили пароль? <Link to={Routes.login}>Войти</Link></div>
            </div>
        </div>
    </div>)
}