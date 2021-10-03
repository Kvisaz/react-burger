import React, { useCallback } from 'react';
import styles from './profile.module.css';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Routes } from '../../services/Routes';
import { useDispatch } from 'react-redux';
import { logoutActionCreator } from '../../services/actions';
import { ProfileEditor } from '../../components/profile-editor/profile-editor';

export function Profile() {
  const dispatch = useDispatch();

  const onLogoutClick = useCallback(() => {
    dispatch(logoutActionCreator());
  }, [dispatch]);

  return (
    <div className={styles.content}>
      <div className={styles.col_left}>
        <div className={`text text_type_main-medium ${styles.links}`}>
          <NavLink to={Routes.profile} exact={true} className='text_color_inactive'
                   activeClassName={styles.active}>Профиль</NavLink>
          <NavLink to={Routes.profileOrders} exact={true} className='text_color_inactive'
                   activeClassName={styles.active}>История заказов</NavLink>
          <span onClick={onLogoutClick}
                className={`text_color_inactive ${styles.link}`}>Выход</span>
        </div>

        <div className='text text_type_main-small text_color_inactive mt-20'>В этом разделе вы можете<br />
          изменить свои персональные данные
        </div>
      </div>

      <div className={styles.col_right}>
        <Switch>
          <Route path={Routes.profile} exact={true}><ProfileEditor /></Route>
          <Route path={Routes.profileOrders} exact={true}>
            <div>profileOrders</div>
          </Route>
        </Switch>
      </div>
    </div>
  );
}