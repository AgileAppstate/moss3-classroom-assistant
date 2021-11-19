import React from "react"
import PropTypes from "prop-types"

import ActionableItemArchivePanel from "../containers/ActionableItemArchivePanel"

const glob = require("glob");
const fs = require('fs');
const { exec } = require('child_process');

const center = {
  display: 'flex',
  'justify-content': 'center',
  'align-items': 'center',
  'margin-top': '10px',
}

const ItemArchivePanelList = function (props, context) {
  return (
    <div className="archive-item-archive-panel-list-container">
      {props.submissions.map(submission => {
        return <ActionableItemArchivePanel key={submission.id} {...submission}/>
      })}
      <div style={center}>
        <button id="checker" class="btn btn-primary" onClick={runMoss}>Run Plagiarism Check</button>
      </div>
    </div>
  )
}

ItemArchivePanelList.propTypes = {
  submissions: PropTypes.array.isRequired
}

function runMoss() {
  // Reading destination directory and removing trailing route
  let url = fs.readFileSync('./destination.txt', {encoding: 'utf-8'});
  url = url.substring(0, url.lastIndexOf('\\'));

  // Checking if the user is using tmp folder and adding C: if
  // true, keeps directory otherwise
  if(url.startsWith('\\tmp')) {
    let temp = 'C:';
    url = temp + url;
  }

  // Replacing all backslahes with forwardslashes
  url = url.replace(/\\/g, '/');

  // Globbing wildcards to get all files to pass to Moss
  glob(url + "/*/*", function(er, files) {
    if(er) {
      console.log(err)
    }
    
    // Surrounding file paths in quotes to avoid errors when
    // spaces are present in file path
    files = files.map(function(file) {
      return '\"' + file + '\"';
    });

    files = files.join(" ");

    alert("This may take a minute");
    
    // Running Moss through the Strawberry Perl interpreter
    // and printing output to stdout
    exec(`../../app/Strawberry/perl/bin/wperl.exe ../../moss.pl ${files}`, (error, stdout, stderr) => {
      if (error) {
        alert(`exec error: ${error}`);
        return;
      }
      alert(`stdout: ${stdout}`);
    });
  }) 
}

export default ItemArchivePanelList
