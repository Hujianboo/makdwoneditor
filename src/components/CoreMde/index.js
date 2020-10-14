import ReactMde from "react-mde";
import React, { useState,useEffect} from 'react';
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const CoreMde = ({value,onFileChange}) => {
  
  const [valueText, setValueText] = useState(value)
  const [selectedTab, setSelectedTab] = React.useState("write");

  //将受控封装成非受控，组件内部自行处理
  useEffect(() => {
    setValueText(value);
  }, [value]);
  const changeHandler = (value) => {
    setValueText(value);
    onFileChange(value);
  }
  return(
    <>
      <ReactMde
        value={valueText}
        // onChange的参数是value
        onChange={changeHandler}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        minEditorHeight={500}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        >
      </ReactMde>
    </>
  )
};
export default CoreMde