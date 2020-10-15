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
import {flattenArr,objToArr} from './utils/helper'
function App() {
  const [files, setFiles] = useState(flattenArr(defaultFiles));
  const [searchedFiles,setSearchedFiles] = useState([]);
  const [activeFileID, setActiveFileID] = useState('');
  const [openedFileIDs, setOpenedFileIDs] = useState([]);
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([]);
  const filesArr = objToArr(files);
  const openedFiles = openedFileIDs.map(openID => {
    return files[openID]
  });
  const filesList = searchedFiles.length > 0 ? searchedFiles : filesArr;
  const activeFile = files[activeFileID];

  const createNewFile = () => {
    const newID = uuidv4()
    const newFile =
    {
      id: newID,
      title: '',
      body: '## 请输出 Markdown',
      createdAt: new Date().getTime(),
      isNew: true, 
    }
    setFiles({...files,[newID]:newFile})
  }

  const fileSearch = (keyword) => {
    const newFiles = filesArr.filter(file => file.title.includes(keyword))
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
    delete files[id]
    setFiles(files);
    tabClose(id);
  }
  const updateFileName = (id,value) => {
    const modifiedFile = {...files[id],title:value,isNew:false}
    setFiles({...files,[id]: modifiedFile});
    debugger
  }
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        {/* 左侧边栏 */}
        <div className="col-4 bg-light left-panel">
          <FileSearch  onFileSearch={fileSearch}></FileSearch>
          <FileList 
            files={filesList}
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
