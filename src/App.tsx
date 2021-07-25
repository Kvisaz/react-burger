import React from 'react';
import './App.css';

import DATA from './utils/data.json';
import {AppHeader} from "./components/app-header/app-header";

console.log('DATA', DATA);

function App() {
  return (
    <div className="App">
      <AppHeader />
    </div>
  );
}

export default App;
