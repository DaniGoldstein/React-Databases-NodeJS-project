import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import { useState, useEffect } from "react";
import React from "react";
import Login from "./Login";
import ToDos  from "./ToDos";
import "./App.css";





const App = () => {


  return (
    <>

      <Routes>


        <Route path='/' element={<Login />}></Route>
        <Route path='/Home/:id' element={<Home  />}></Route>
        <Route path="/Home/toDos/:id" element={ <ToDos />}/>

      </Routes>

    </>
  );
};

export default App;