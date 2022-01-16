import React, { Component } from "react";
import Highlight from "./Highlight";
import { Draggable } from "react-beautiful-dnd";

class Bucket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDrags: 0      
    };
  }

  render() {
    const {
      showGroupedData,
      id,
      addSelectedNotes,
      allNotes,
      allBuckets,
      deleteNoteFromBucket,
      editNoteFromBucket,
      ctrlPressed,
      selectedNotes,
    } = this.props;
    if (!showGroupedData) {
      return (
        <React.Fragment>          
          <div className = "">
            {allNotes &&
              allNotes.map((eachNote) => {
                console.log(eachNote,"eachnote")
                return (                  
                  <div className = "card-div">   
                      <Draggable
                        key={eachNote.id}
                        draggableId={eachNote.id}
                        index={eachNote.id}
                      >
                        {(provided) => (
                          <div
                            key={eachNote.id}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <Highlight
                              showGroupedData={showGroupedData}
                              bucketId={id}
                              id={eachNote.id}
                              addSelectedNotes={addSelectedNotes}
                              mainContent={eachNote.body}
                              userName={eachNote.name}
                              color={eachNote.color}
                              allBuckets={allBuckets}
                              deleteNodeFromList={deleteNoteFromBucket}
                              editNoteFromBucket={editNoteFromBucket}
                              ctrlPressed={ctrlPressed}
                              selectedNotes={selectedNotes}
                            />
                          </div>
                        )}
                      </Draggable>                          
                  </div>
                );
              })}
            </div>
        </React.Fragment>
      );
    } else {
      return (
        <div>
          <h5 className = "text-center bucket-head mb-1">{id}</h5>
          <div className = "">         
              {allNotes &&
                allNotes.map((eachNote) => {
                  return (
                    <div className = "card-div">
                      <Draggable
                        key={eachNote.id}
                        draggableId={eachNote.id}
                        index={eachNote.id}
                      >
                        {(provided) => (
                          <div
                            key={eachNote.id}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <Highlight
                              showGroupedData={showGroupedData}
                              bucketId={id}
                              id={eachNote.id}
                              addSelectedNotes={addSelectedNotes}
                              mainContent={eachNote.body}
                              userName={eachNote.name}
                              color={eachNote.color}
                              allBuckets={allBuckets}
                              deleteNodeFromList={deleteNoteFromBucket}
                              editNoteFromBucket={editNoteFromBucket}
                              ctrlPressed={ctrlPressed}
                              selectedNotes={selectedNotes}
                            />
                          </div>
                        )}
                      </Draggable>
                    </div>
                  );
                })}
            
          </div>
        </div>
      );
    }
  }
}

export default Bucket;
