import React, {useCallback, useEffect, useMemo} from 'react';
import styles from './profile.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {Routes} from '../../services/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../services/store';
import {
    IBurgerActionType,
    logoutActionCreator,
    requestProfileActionCreator,
    updateProfileActionCreator
} from '../../services/actions';
import {Loading} from '../../components/loading/loading';

export function Profile() {
    const {
        isProfileSuccess = false,
        userEmail = '',
        userName = '',
        userPassword = '',
        profileName: name = userName,
        profileEmail: email = userEmail,
        profilePassword: password = userPassword,
    } = useSelector((state: RootState) => ({...state}));

    const profileChanged = useMemo(() => userEmail !== email
        || userName !== name
        || password !== userPassword,
        [userName, userEmail, name, email, password, userPassword])

    const dispatch = useDispatch();

    const onNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist(); // deprecated since React 17
        dispatch({
            type: IBurgerActionType.PROFILE_PAGE_CHANGE, data: {
                name: e.target.value,
                email, password
            }
        })
    }, [dispatch, email, password])

    const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist(); // deprecated since React 17
        dispatch({
            type: IBurgerActionType.PROFILE_PAGE_CHANGE, data: {
                name,
                email: e.target.value,
                password
            }
        })
    }, [dispatch, name, password])

    const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist(); // deprecated since React 17
        dispatch({
            type: IBurgerActionType.PROFILE_PAGE_CHANGE, data: {
                name, email,
                password: e.target.value
            }
        })
    }, [dispatch, name, email])

    const onUpdateClick = useCallback(() => {
        dispatch(updateProfileActionCreator())
    }, [dispatch])

    const onResetClick = useCallback(() => {
        dispatch({type: IBurgerActionType.PROFILE_PAGE_RESET})
    }, [dispatch])

    const onLogoutClick = useCallback(() => {
        dispatch(logoutActionCreator())
    }, [dispatch])

    const buttonClass = useMemo(() =>
            profileChanged ? styles.buttons : `${styles.buttons} ${styles.hidden}`, [
            profileChanged
        ]
    )

    useEffect(() => {
        if (!isProfileSuccess) {
            dispatch(requestProfileActionCreator())
        }
    }, [isProfileSuccess, dispatch])

    return (
        <>
            {isProfileSuccess ? (
                    <div className={styles.wrap}>
                        <div className={styles.content}>
                            <div className={styles.col_left}>
                                <div className={`text text_type_main-medium ${styles.links}`}>
                                    <span>Профиль</span>
                                    <Link to={Routes.orders} className='text_color_inactive'>История заказов</Link>
                                    <span onClick={onLogoutClick}
                                          className={`text_color_inactive ${styles.link}`}>Выход</span>
                                </div>

                                <div className='text text_type_main-small text_color_inactive'>В этом разделе вы можете<br/>
                                    изменить свои персональные данные
                                </div>
                            </div>

                            <div className={styles.col_right}>
                                <Input placeholder={'Имя'} value={name} onChange={onNameChange}/>
                                <Input placeholder={'Логин'} value={email} onChange={onEmailChange}/>
                                <PasswordInput name={'password'} value={password} onChange={onPasswordChange}/>
                                <div className={buttonClass}>
                                    <span onClick={onResetClick}
                                          className={`text text_type_main-small ${styles.link}`}>Отмена</span>
                                    <Button onClick={onUpdateClick} size={'medium'} type={'primary'}>Сохранить</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                : (
                    <Loading/>
                )}
        </>
    )
}