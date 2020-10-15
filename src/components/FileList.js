import React, { useState,useEffect,useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faTrash,faTimes } from '@fortawesome/free-solid-svg-icons';
import {faMarkdown} from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types';
import useKeyPress from '../hooks/useKeyPress';
const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {
  const [ editStatus, setEditStatus ] = useState(false) //编辑状态
  const [ value, setValue ] = useState('') //input内部的value
  const enterKey = useKeyPress(13);
  const escKey = useKeyPress(27);
  const node = useRef(null);

  const closeInput = () => {   //关闭搜索操作
    const item = files.find(file => file.id === editStatus);
    setEditStatus(false);
    setValue('');
    if(item.isNew){
      onFileDelete(item.id);
    }
  }
  useEffect(() => {
    if (enterKey && editStatus && value.trim() !== '') { //编辑状态下，点击Enter保存当前input的值,然后不关闭框。
      const editItem = files.find(file => file.id === editStatus)
      onSaveEdit(editItem.id, value)
      closeInput()
    }
    if (escKey && editStatus) { //编辑状态下，点击Esc关闭当前的对话框。
      closeInput()
    }
  },[enterKey,editStatus,escKey])
  useEffect(() => {
    const newFile = files.find(file => file.isNew);
    if(newFile){
      setEditStatus(newFile.id);
      setValue(newFile.title);
    }
  },[files]);
  useEffect(() => {
    if(editStatus){
      node.current.focus();
    }
  }, [editStatus]);
  return(
    <ul className="list-group list-group-flush file-list ">
      {
        files.map(file => (
          <li
          className="list-group-item bg-light row d-flex align-items-center file-item mx-0"
            key={file.id}
          >
            {
              (file.id !== editStatus && file.isNew !== true) && 
              <>
                <span className="col-2">
                  <FontAwesomeIcon
                    size="lg"
                    icon={faMarkdown} 
                  />
                </span>
                <span className="col-8 c-link" onClick={() => {onFileClick(file.id)}}>{file.title}</span>
                <button
                  type="button"
                  className="icon-button col-1"
                  onClick={()=> {setEditStatus(file.id);setValue(file.title)}}
                >
                  <FontAwesomeIcon
                    title="编辑"
                    size="lg"
                    icon={faEdit} 
                  />
                </button>
                <button
                  type="button"
                  className="icon-button col-1"
                  onClick={()=> { onFileDelete(file.id)}}
                >
                  <FontAwesomeIcon
                    title="删除"
                    size="lg"
                    icon={faTrash} 
                  />
                </button>
              </>
            }
            {
              (file.id === editStatus || file.isNew === true) &&
              <>
                <input
                className="form-control col-10"
                value={value}
                ref={node}
                placeholder="请输入文件名称"
                onChange={(event) => { setValue(event.target.value)}}
                />
                <button
                  type="button"
                  className="icon-button col-2"
                  onClick={closeInput}
                >
                  <FontAwesomeIcon
                    title="关闭"
                    size="lg"
                    icon={faTimes} 
                  />
                </button>
              </>
            }
          </li>
        ))
      }
    </ul>
  )
}
FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onFileDelete: PropTypes.func,
  onSaveEdit: PropTypes.func,
}
export default FileList;