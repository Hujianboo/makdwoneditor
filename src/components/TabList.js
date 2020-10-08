import React from 'react';
import classNames from 'classnames';
import {faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TabList.scss'


// files : 数组类型，总文件
// unsaveIds : 数组类型，未保存文件的id
// activeIds : 字符串类型 激活文件的id
/**
 * @description: 
 * @param {Array} files
 * @param {Array} unsaveIds
 * @param {String} activeId
 * @param {Function} onTabClick
 * @param {Function} onCloseTab
 * 
 * @return {type} 
 */
const TabList = ({files,unsaveIds,activeId,onTabClick,onCloseTab}) => {
  return(
    <ul className="nav nav-tabs tablist-component">
      {
        files.map(file => {
          const unSaveMark = unsaveIds.includes(file.id);
          const className = classNames({
            'nav-link': true,
            'unsave': unSaveMark,
            'active': activeId === file.id
          })
          return(
            <li className="nav-item" key={file.id}>
              <a 
                href="#"
                className={className}
                onClick={(e) => {e.preventDefault();onTabClick(file.id)}}
                >
                <span>
                  {file.title}
                </span>
                <span
                  className="ml-2 close-icon"
                  onClick={(e) => {e.stopPropagation();onCloseTab(file.id)}}
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                  />
                </span>
                {unSaveMark && <span className="ml-2 unsaved-icon rounded-circle"></span>}
              </a>
            </li>
          )
        })
      }
    </ul>
  )
};

export default TabList;