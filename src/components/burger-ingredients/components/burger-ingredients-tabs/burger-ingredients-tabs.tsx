import React from 'react';
import styles from './burger-ingredients-tabs.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { MainActionType } from '../../../../services/actions';
import { useMainState } from '../../../../services/hooks/useMainState';


BurgerIngredientsTabs.propTypes = {
  onPageSelect: PropTypes.func,
};

export function BurgerIngredientsTabs() {

  const dispatch = useDispatch();
  const { currentTabIndex, tabs } = useMainState();

  const onClick = (value: string) => {
    dispatch({ type: MainActionType.TAB_SELECT, index: parseInt(value) });
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