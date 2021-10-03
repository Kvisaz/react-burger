import React, { useCallback } from 'react';
import styles from './profile.module.css';
import { Link } from 'react-router-dom';
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
    <div className={styles.wrap}>
      <div className={styles.content}>
        <div className={styles.col_left}>
          <div className={`text text_type_main-medium ${styles.links}`}>
            <span>Профиль</span>
            <Link to={Routes.profileOrders} className='text_color_inactive'>История заказов</Link>
            <span onClick={onLogoutClick}
                  className={`text_color_inactive ${styles.link}`}>Выход</span>
          </div>

          <div className='text text_type_main-small text_color_inactive'>В этом разделе вы можете<br />
            изменить свои персональные данные
          </div>
        </div>

        <div className={styles.col_right}>
          <ProfileEditor />
        </div>
      </div>
    </div>
  );
}