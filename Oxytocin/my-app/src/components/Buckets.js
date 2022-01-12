import React, { Component, createRef } from "react";
import Bucket from "./Bucket";
import AddHighlight from "./AddHighlight";
import { Button } from "reactstrap";
import Cookies from "js-cookie";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default class Buckets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inComingData: null,
      isModalOpen: false,
      allBuckets: [],
      selectedNotes: []
    };
    
    this.bindFunctions();
  }

  bindFunctions(){
    this.toggleModal = this.toggleModal.bind(this);
    this.createNewBucket = this.createNewBucket.bind(this);
    this.deleteNoteFromBucket = this.deleteNoteFromBucket.bind(this);
    this.editNoteFromBucket = this.editNoteFromBucket.bind(this);
    this.findNoteFromId = this.findNoteFromId.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);    
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  componentDidUpdate() {
    Cookies.remove("idea_management");
    Cookies.set("idea_management", JSON.stringify(this.state));
  }
  componentDidMount() {
    if (Cookies.get("idea_management")) {
      this.setState(JSON.parse(Cookies.get("idea_management")));
      this.setState({ incomingData: null });
    }       
  }

  createNewBucket(bucketId, note) {
    if (
      this.state.allBuckets.find((eachBucket) => eachBucket.id === bucketId)
    ) {
      const tempAllBucket = this.state.allBuckets;
      tempAllBucket.forEach((eachBucket) => {
        if (eachBucket.id === bucketId) {
          eachBucket.allNotes.push(note);
        }
      });
      this.setState({
        allBuckets: tempAllBucket,
      });
      console.log("added the new note to" + bucketId);
    } else {
      this.setState({
        allBuckets: [
          ...this.state.allBuckets,
          { id: bucketId, allNotes: [note] },
        ],
      });
    }
  }

  deleteNoteFromBucket(bucketId, noteId) {
    let tempAllBucket = this.state.allBuckets;
    let deleteThisBucket = null;
    tempAllBucket.forEach((eachBucket) => {
      if (eachBucket.id === bucketId) {
        eachBucket.allNotes = eachBucket.allNotes.filter(
          (eachNote) => eachNote.id !== noteId
        );
      }
      if (eachBucket.allNotes.length === 0) {
        deleteThisBucket = eachBucket;
      }
    });
    if (deleteThisBucket) {
      tempAllBucket = tempAllBucket.filter(
        (eachBucket) => eachBucket.id !== deleteThisBucket.id
      );
    }
    this.setState({
      allBuckets: tempAllBucket,
    });
  }

  editNoteFromBucket(bucketId, noteId, name, body, color) {
    const tempInComingData = {
      name,
      body,
      color,
      selectedBucketId: bucketId,
      cb: () => {
        this.deleteNoteFromBucket(bucketId, noteId);
        setTimeout(() => {
          this.setState({
            incomingData: null,
          });
        }, 100);
      },
    };
    this.setState({
      incomingData: tempInComingData,
    });
    setTimeout(() => {
      this.setState({
        isModalOpen: true,
      });
    }, 50);
  }

  findNoteFromId(noteId, bucketId) {
    let bucket = null;
    this.state.allBuckets.forEach((eachBucket) => {
      if (eachBucket.id === bucketId) {
        bucket = eachBucket;
      }
    });  
    let ansNote = null;
    if (bucket) {
      bucket.allNotes.forEach((eachNote) => {
        if (eachNote.id === noteId) {
          ansNote = eachNote;
        }
      });
    }
    return ansNote;
  }

  handleOnDragEnd(result) {
    if (!result.destination) return;
    console.log(result);
    const noteId = result.source.index,
      bucketId = result.source.droppableId;    
    const newBucketId = result.destination.droppableId;    
    const noteToMove = this.findNoteFromId(noteId, bucketId);
    console.log({ noteToMove });
    this.deleteNoteFromBucket(bucketId, noteId);
    this.createNewBucket(newBucketId, noteToMove);
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.handleOnDragEnd}>
        <div className = "container text-center m-2 mb-3">
          {this.props.showGroupedData ? <span></span> : <Button   
              className = "btn-info btn-sm"         
              id="add-btn"              
              
              onClick={this.toggleModal}
          >
            <span>Add <div className="fa fa-plus-circle fa-lg" aria-hidden="true"></div></span>
          </Button>}
          <h4>HIGHLIGHTS</h4>          
        </div>
        <div className="container text-center">  
          {this.props.showGroupedData ? (<div><h5>Drag and drop to change groups</h5><br/></div>) : <span></span>}        
          <AddHighlight
            open={this.state.isModalOpen}
            toggleModal={this.toggleModal}
            addNoteToBucket={this.createNewBucket}
            allBuckets={this.state.allBuckets}
            inComingData={this.state.incomingData}
          />
          <React.Fragment>
            <div className = "row">
              
                  {this.state.allBuckets.map((eachBucket) => {
                  return (
                    
                    <div className = "col-3 text-center mt-1" style={{display: "inline-block"}}>
                      <Droppable key={eachBucket.id} droppableId={eachBucket.id}>
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            <Bucket
                              addSelectedNotes={this.addSelectedNotes}
                              key={eachBucket.id}
                              showGroupedData={this.props.showGroupedData}
                              id={eachBucket.id}
                              allNotes={eachBucket.allNotes}
                              allBuckets={this.state}
                              deleteNoteFromBucket={this.deleteNoteFromBucket}
                              editNoteFromBucket={this.editNoteFromBucket}                             
                              selectedNotes={this.state.selectedNotes}
                            />
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  );
                  })}
            </div>              
            
          </React.Fragment>
        </div>
      </DragDropContext>
    );
  }
}
