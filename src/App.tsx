import React from 'react';
import styles from './App.module.css';

import DATA from './utils/data.json';
import {AppHeader} from "./components/app-header/app-header";

console.log('DATA', DATA);

function App() {
    return (
        <div className={styles.App}>
            <AppHeader/>
            <div className={styles.row}>
                <div className={styles.col_left}>
                    <span className='text text_type_main-large'>Соберите бургер</span>
                </div>
                <div className={styles.col_right}>
                    dd
                </div>
            </div>
        </div>
    );
}

export default App;
