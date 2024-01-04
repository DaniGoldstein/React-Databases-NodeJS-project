import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import Home from './Home';
import React from "react";
import Login from "./Login";
import ToDos  from "./ToDos";
import Posts from "./posts";
import Albums from "./albums";
import Photos from "./photos";
import "./App.css";
import Logout from "./logout";







const App = () => {


  return (
    <>
    <Logout></Logout>
      <Routes>


        <Route path='/' element={<Login />}></Route>
        <Route path='/Home/:id' element={<Home  />}></Route>
        <Route path="/Home/toDos/:id" element={ <ToDos />}/>
        <Route path="/Home/albums/:id" element={ <Albums />}/>
        <Route path="/Home/posts/:id" element={ <Posts/>}/>
        <Route path="/Home/photos/:id" element={ <Photos/>}/>
      </Routes>

    </>
  );
};

export default App;