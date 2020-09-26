import React, { useState,useEffect, useRef} from 'react';
import useKeyPress from '../hooks/useKeyPress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
const FileSearch = ({ title, onFileSearch }) => {
    const [ inputActive, setInputActive ] = useState(false)
    const [ value, setValue ] = useState('')
    const enterKey = useKeyPress(13);
    const escKey = useKeyPress(27);
    let node = useRef(null);

    const closeSearch = () => {
        setInputActive(false);
        setValue('');
    }
    useEffect(() => {
      if(enterKey && inputActive){
        onFileSearch(value);
      }else if(escKey && inputActive){
        closeSearch()
      }
    });
    useEffect(() => {
        if(inputActive){
            node.current.focus()
        }
    },[inputActive])
    return (
      <div className="alert alert-primary d-flex justify-content-between align-items-center">
        { !inputActive && 
          <>
            <span>{title}</span>
            <button
              type="button"
              className="icon-button"
              onClick={() => { setInputActive(true) }}
            >
                <FontAwesomeIcon
                title="搜索"
                size="lg"
                icon={faSearch} 
                />
            </button>
          </>
        }
        { inputActive &&
          <>
            <input
              className="form-control"
              value={value}
              ref={node}
              onChange={(e) => {setValue(e.target.value)}}
            />
            <button
              type="button"
              className="icon-button"
              onClick={closeSearch}
            >
                <FontAwesomeIcon
                title="关闭"
                size="lg"
                icon={faTimes} 
                />
            </button>
          </>
        }
      </div>
    )
  }
FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired,
}
FileSearch.defaultProps = {
  title: '我的云文档'
}
export default FileSearch;
