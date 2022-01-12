import React, { Component } from "react";
import Buckets from "./Buckets";
import NavbarCustom from "./NavbarCustom"
import { Button } from "reactstrap";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGroupedData: false
    };
    this.toggleShowGroupData = this.toggleShowGroupData.bind(this);
  }

  toggleShowGroupData() {
    this.setState({ showGroupedData: !this.state.showGroupedData });
  }
  componentDidMount() {
    document.body.style.zoom = "100%";
  }
  handleZoomIn() {
    document.body.style.zoom = `${parseInt(document.body.style.zoom) + 10}%`;
  }
  handleZoomOut() {
    document.body.style.zoom = `${parseInt(document.body.style.zoom) - 10}%`;
  }

  render() {
    return (
      <div>
        <NavbarCustom toggleShowGroupData = {this.toggleShowGroupData}/>  
        <div className="container-fluid">        
          <div>                    
            <Buckets showGroupedData={this.state.showGroupedData} />
            <Button color="link" className="zoomin" onClick={this.handleZoomIn}>
              <span className="fa fa-search-plus fa-lg"></span>
            </Button>
            <Button color="link" className="zoomout" onClick={this.handleZoomOut}>
              <span className="fa fa-search-minus fa-lg"></span>
            </Button>
          </div>
        </div>
      </div>            
    );
  }
}

export default Main;
