import React from "react";
import { Button } from "reactstrap";

export default function Highlight({
  id,
  showGroupedData,
  addSelectedNotes,
  editNoteFromBucket,
  deleteNodeFromList,
  bucketId,
  mainContent = "mainContent",
  userName = "userName",
  color,
  selectedNotes,
}) {
  function deleteNote() {
    deleteNodeFromList(bucketId, id);
  }
  function editNode() {
    editNoteFromBucket(bucketId, id, userName, mainContent, color);
  }
   
  return (
    <div>
      <Button color="link" onClick={editNode} style = {{float: "left"}}>          
          <span className="fa fa-edit fa-sm edit-btn"></span>
        </Button>
      <Button color="link" onClick={deleteNote} style = {{float: "right"}}>
        <span className="fa fa-times fa-sm delete-btn"></span>
      </Button>
      <div       
        className="highlight"        
      >          
        <div className = "text-left">         
          <p>{mainContent}</p>
          <p className = "text-muted text-right">- {userName}</p>          
        </div>             
      </div>
    </div>
  );
}
