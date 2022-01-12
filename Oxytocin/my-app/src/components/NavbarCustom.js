import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, Button } from "reactstrap";

export default function NavbarCustom(props){    

  return(
    <Navbar className = "navbar" light expand="md">
      <NavbarBrand style={{ color: "black" }} className="m-auto header">
        
      </NavbarBrand>
      <Nav navbar>
        <Button className = "btn-primary grp-button"           
          onClick={props.toggleShowGroupData}
        >
          Group Highlights
        </Button>
      </Nav>
    </Navbar>   
  )
}