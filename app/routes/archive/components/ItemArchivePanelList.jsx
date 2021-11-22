import React from "react"
import PropTypes from "prop-types"
import ActionableItemArchivePanel from "../containers/ActionableItemArchivePanel"
import { runMoss } from "../../../lib/mossutils.js"

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
        return <ActionableItemArchivePanel key={submission.id} {...submission} />
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

export default ItemArchivePanelList
