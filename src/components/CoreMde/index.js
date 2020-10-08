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

const CoreMde = ({value}) => {
  
  const [valueText, setValueText] = useState(value)
  const [selectedTab, setSelectedTab] = React.useState("write");

  useEffect(() => {
    setValueText(value);
  }, [value]);

  return(
    <>
      <ReactMde
        value={valueText}
        onChange={setValueText}
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