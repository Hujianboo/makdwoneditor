import { useState,useEffect} from 'react';
import PropTypes from 'prop-types';

const useKeyPress = (targetKeyCode) => {
  const [keyState, setkeyState] = useState(false);
  const handleKeyDown = (event) => {
    const {keyCode} = event;
    if(keyCode === targetKeyCode){
      setkeyState(true);
    }
  };
  const handleKeyUp = (event) => {
    const {keyCode} = event;
    if(keyCode === targetKeyCode){
      setkeyState(false);
    }
  }
  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('keydown',handleKeyDown);
    return () => {
      document.addEventListener('keyup',handleKeyUp);
      document.addEventListener('keydown',handleKeyDown);
    };
  },[]);
  return keyState;
};
export default useKeyPress