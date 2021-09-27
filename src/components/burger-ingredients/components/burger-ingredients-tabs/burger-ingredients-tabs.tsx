import React from 'react';
import styles from './burger-ingredients-tabs.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../services/store';
import { IAppState } from '../../../../model/IAppState';
import { IBurgerActionType } from '../../../../services/actions';


BurgerIngredientsTabs.propTypes = {
  onPageSelect: PropTypes.func,
};

export function BurgerIngredientsTabs() {

  const dispatch = useDispatch();
  const { currentTabIndex, tabs } = useSelector<RootState>(state => ({ ...state })) as IAppState;

  const onClick = (value: string) => {
    dispatch({ type: IBurgerActionType.TAB_SELECT, index: parseInt(value) });
  };

  return (
    <div className={`mt-5 ${styles.main}`}>
      {
        tabs.map(({ name }, index) => (
          <Tab key={index} value={index.toString()} active={currentTabIndex === index} onClick={onClick}>
            {name}
          </Tab>
        ))
      }
    </div>
  );
}