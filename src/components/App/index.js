// == Import npm
import React from 'react';

// == Import
import logo from 'src/assets/logo_bleu.png';
import './style.scss';

// == Composant
const App = () => (
  <div className="app">
    <img src={logo} alt="react logo" />
    <h1>CarelyTeam</h1>
  </div>
);

// == Export
export default App;
