import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileSearch from './components/FileSearch';
import FileList from './components/FileList';
import defaultFiles from './utils/defaultFiles';

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col">
          <FileSearch  onFileSearch={(value) => {console.log(value)}}></FileSearch>
          <FileList 
            files={defaultFiles}
            onFileClick={(id) => {console.log(id)}}
            onFileDelete={(id) => {console.log(id)}}
            onSaveEdit={(id,newValue) => {console.log(id);console.log(newValue);}}
            ></FileList>
        </div>
        <div className="col bg-primary right-pannel">
          <h1>this is the right</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
