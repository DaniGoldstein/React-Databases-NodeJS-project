import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import React from "react";
import Login from "./Login";
import ToDos  from "./ToDos";
import Posts from "./posts";
import Albums from "./albums";
import "./App.css";





const App = () => {


  return (
    <>

      <Routes>


        <Route path='/' element={<Login />}></Route>
        <Route path='/Home/:id' element={<Home  />}></Route>
        <Route path="/Home/toDos/:id" element={ <ToDos />}/>
        <Route path="/Home/albums/:id" element={ <Albums />}/>
        <Route path="/Home/posts/:id" element={ <Posts/>}/>

      </Routes>

    </>
  );
};

export default App;