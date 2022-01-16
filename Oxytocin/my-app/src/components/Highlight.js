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
  ctrlPressed,
  selectedNotes,
}) {
  function deleteNote() {
    deleteNodeFromList(bucketId, id);
  }
  function editNode() {
    editNoteFromBucket(bucketId, id, userName, mainContent, color);
  }

  const currentNoteSelected =  ctrlPressed && selectedNotes.find((eachSelectedNote) => eachSelectedNote.noteId === id);
   
  return (
    <div onClick={() => {
      if (ctrlPressed) {
        addSelectedNotes(bucketId, id);
      }
    }}   
    style={{        
      border: currentNoteSelected ? "2px solid blue" : "none",
      backgroundColor: color
    }}>
      <Button color="link" onClick={editNode} style = {{float: "left"}}>          
          <span className="fa fa-edit fa-sm edit-btn"></span>
        </Button>
      { !showGroupedData ? <span className = "text-center bucket-head" style = {{ display: "inline-block", padding: "3px 4px", margin: "5px auto"}}>{bucketId}</span> : <span></span> }                           
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
