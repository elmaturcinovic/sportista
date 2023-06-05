import React from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import '../stylesheet_auth.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';


const ToggleSwitch = ({ isDarkTheme, onToggle }) => {
  const offLabel = (
    <>
      <FontAwesomeIcon icon={faSun} className="mr-2" />
      {'\u00A0'} Light Theme
    </>
  );

  const onLabel = (
    <>
      <FontAwesomeIcon icon={faMoon} className="mr-2" />
      {'\u00A0'} Dark Theme
    </>
  );
  return (
    <div>
      <BootstrapSwitchButton 
        onstyle="outline-secondary" 
        offstyle="outline-dark"
        id="theme-switch"
        checked={isDarkTheme}
        onChange={onToggle}
        onlabel={onLabel}
        offlabel={offLabel}
        classname="toggle-switch"
    />
    </div>
    
  );
};

export default ToggleSwitch;

