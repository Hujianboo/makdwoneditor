import React, { useState } from 'react';
import {faPlus, faFileImport} from '@fortawesome/free-solid-svg-icons';
import BottomBtn from './components/BottomBtn';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileSearch from './components/FileSearch';
import FileList from './components/FileList';
import TabList from './components/TabList';
import defaultFiles from './utils/defaultFiles';
import CoreMde from './components/CoreMde';

function App() {
  const [files, setFiles] = useState(defaultFiles);
  const [activeFileID, setActiveFileID] = useState('1');
  const [openedFileIDs, setOpenedFileIDs] = useState(['1','2','3']);
  const [unsavedFileIDs, setUnsavedFileIDs] = useState(['2','3']);
  const openedFiles = openedFileIDs.map(openID => {
    return files.find(file => file.id === openID)
  });
  const fileClick = (fileID) => {
    setActiveFileID(fileID);
    if(!openedFileIDs.includes(fileID)){
      setOpenedFileIDs([...openedFileIDs,fileID])
    }
  }
  const tabClick = (fileID) => {
    setActiveFileID(fileID)
  }

  const tabClose = (id) => {
    const tabsWithout = openedFileIDs.filter(fileID => fileID !== id)
    setOpenedFileIDs(tabsWithout)
    if (tabsWithout.length > 0) {
      setActiveFileID(tabsWithout[0])
    } else {
      setActiveFileID('')
    }
  }
  const activeFile = files.find(file => file.id === activeFileID);
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-4 bg-light left-panel">
          <FileSearch  onFileSearch={(value) => {console.log(value)}}></FileSearch>
          <FileList 
            files={files}
            onFileClick={fileClick}
            onFileDelete={(id) => {console.log(id)}}
            onSaveEdit={(id,newValue) => {console.log(id);console.log(newValue);}}
            ></FileList>
            <div className="row no-gutters button-group">
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
          { !activeFile && 
            <div className="start-page">
              选择或者创建新的 Markdown 文档
            </div>
          }
          { activeFile &&
            <>
              <TabList
                files={openedFiles}
                activeId={activeFileID}
                unsaveIds={unsavedFileIDs}
                onTabClick={tabClick}
                onCloseTab={tabClose}
              />
              <CoreMde 
                value={activeFile && activeFile.body}
              />
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
