import React, { useState } from 'react';
import {faPlus, faFileImport} from '@fortawesome/free-solid-svg-icons';
import BottomBtn from './components/BottomBtn';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileSearch from './components/FileSearch';
import FileList from './components/FileList';
import TabList from './components/TabList';
import defaultFiles from './utils/defaultFiles';
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import "easymde/dist/easymde.min.css";
function App() {
  const [files, setFiles] = useState(defaultFiles);
  const [activeFileID, setActiveFileID] = useState('1');
  const [openedFileIDs, setOpenedFileIDs] = useState([]);
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([]);
  const openedFiles = openedFileIDs.map(openID => {
    return files.find(file => file.id === openID)
  });
  const activeFile = files.find(file => file.id === activeFileID);
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-4 bg-light left-panel">
          <FileSearch  onFileSearch={(value) => {console.log(value)}}></FileSearch>
          <FileList 
            files={files}
            onFileClick={(id) => {console.log(id)}}
            onFileDelete={(id) => {console.log(id)}}
            onSaveEdit={(id,newValue) => {console.log(id);console.log(newValue);}}
            ></FileList>
            <div className="row no-gutters">
              <div className="col">
                <BottomBtn
                  text="新建"
                  colorClass="btn-primary"
                  icon={faPlus}
                ></BottomBtn>
              </div>
              <div className="col">
                <BottomBtn
                  text="导入"
                  colorClass="btn-success"
                  icon={faFileImport}
                ></BottomBtn>
              </div>
            </div>
        </div>
        <div className="col-8 right-pannel">
          {
            !activeFile &&
            <div>空</div>
          }{
            activeFile && 
          <>
            <TabList
              files={defaultFiles}
              unsaveIds={['1','3']}
              activeId={'2'}
            />
            <ReactMde
              value={defaultFiles[1].body}
              onChange={(value) => {console.log(value)}}
              onTabChange={() => {}}
            />
          </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
