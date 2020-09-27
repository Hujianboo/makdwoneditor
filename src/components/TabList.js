import React, { useState,useEffect, useRef} from 'react';

const TabList = ({files}) => {

  return(
    <ul className="nav nav-tabs">
      {
        files.map(file => {
          
          return(
            <li className="nav-item">
              <a className="nav-link" href="">
                <span>
                  {file.title}
                </span>
              </a>
            </li>
          )
        })
      }
    </ul>
  )
};

export default TabList;