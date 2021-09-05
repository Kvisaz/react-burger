import React, {useCallback} from 'react';
import styles from './profile.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {Routes} from '../../services/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../services/store';
import {logoutActionCreator} from '../../services/actions';

export function Profile() {
    const {userForgotEmail: email = ''} = useSelector((state: RootState) => ({...state}));
    const dispatch = useDispatch();

    const onNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onNameChange ', e.target.value);
    }, [])

    const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onNameChange ', e.target.value);
    }, [])

    const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onPasswordChange ', e.target.value);
    }, [])

    const onButtonClick = useCallback(() => {
        console.log('onButtonClick');
    }, [])

    const onLogoutClick = useCallback(() => {
        dispatch(logoutActionCreator())
    }, [dispatch])

    return (<div className={styles.wrap}>
        <div className={styles.content}>
            <div className={styles.col_left}>
                <div className={`text text_type_main-medium ${styles.links}`}>
                    <span>Профиль</span>
                    <Link to={Routes.orders} className='text_color_inactive'>История заказов</Link>
                    <span onClick={onLogoutClick} className={`text_color_inactive ${styles.link}`}>Выход</span>
                </div>

                <div className='text text_type_main-small text_color_inactive'>В этом разделе вы можете<br/>
                    изменить свои персональные данные
                </div>
            </div>

            <div className={styles.col_right}>
                <Input placeholder={'Имя'} value={''} onChange={onNameChange}/>
                <Input placeholder={'Логин'} value={''} onChange={onEmailChange}/>
                <PasswordInput name={'password'} value={''} onChange={onPasswordChange}/>
                <div className={styles.buttons}>
                    <Link to={Routes.profile} className={`text text_type_main-small ${styles.link_profile}`}>Отмена</Link>
                    <Button onClick={onButtonClick} size={'medium'} type={'primary'}>Сохранить</Button>
                </div>
            </div>
        </div>
    </div>)
}