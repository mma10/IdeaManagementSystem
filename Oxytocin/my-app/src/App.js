import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { DragDropContext } from "react-beautiful-dnd";

export default function App() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}
