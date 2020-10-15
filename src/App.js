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
import uuidv4 from 'uuid/v4'

function App() {
  const [files, setFiles] = useState(defaultFiles);
  const [searchedFiles,setSearchedFiles] = useState([]);
  const [activeFileID, setActiveFileID] = useState('');
  const [openedFileIDs, setOpenedFileIDs] = useState([]);
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([]);
  const openedFiles = openedFileIDs.map(openID => {
    return files.find(file => file.id === openID)
  });
  const filesArr = searchedFiles.length > 0 ? searchedFiles : files;
  const activeFile = files.find(file => file.id === activeFileID);

  const createNewFile = () => {
    const newID = uuidv4()
    const newFiles = [
      ...files,
      {
        id: newID,
        title: '',
        body: '## 请输出 Markdown',
        createdAt: new Date().getTime(),
        isNew: true,
      }
    ]
    setFiles(newFiles)
  }

  const fileSearch = (keyword) => {
    const newFiles = files.filter(file => file.title.includes(keyword))
    setSearchedFiles(newFiles)
  }

  const fileClick = (fileID) => {
    //设置当前active ID
    setActiveFileID(fileID);
    //将当前active ID放入openedFileID中（如果已经存在了，就不加入，做一个判断） 
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
  const fileChange = (id,value) => {
    const newFiles = files.map((file) => {
      if(file.id === id){
        file.body = value;
      };
      return file;
    })
    setFiles(newFiles)
    if(!unsavedFileIDs.includes(id)){
      setUnsavedFileIDs([...unsavedFileIDs, id])
    }
  }
  const fileDelete = (id) => {
    const newFiles = files.filter((file) => file.id !== id);
    setFiles(newFiles);
    // tabClose(id);
  }
  const updateFileName = (id,value) => {
    const newFiles = files.map((file) => {
      if(file.id === id){
        file.title = value
        file.isNew = false
      };
      return file;
    })
    setFiles(newFiles);
  }
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        {/* 左侧边栏 */}
        <div className="col-4 bg-light left-panel">
          <FileSearch  onFileSearch={fileSearch}></FileSearch>
          <FileList 
            files={filesArr}
            onFileClick={fileClick}
            onFileDelete={fileDelete}
            onSaveEdit={updateFileName}
            ></FileList>
            <div className="row no-gutters button-group">
              <div className="col">
                <BottomBtn
                  text="新建"
                  colorClass="btn-primary"
                  icon={faPlus}
                  onBtnClick={createNewFile}
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
        {/* 右侧展示栏  */}
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
                onFileChange={(value) => {fileChange(activeFile.id,value)}}
              />
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
