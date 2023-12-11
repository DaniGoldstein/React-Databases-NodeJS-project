import React from 'react';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';




export default function Login(props) {


    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    async function checkUser() { 
        let users = await fetch(`http://localhost:3500/users?username=${userName}&&website=${password}`);
        
        let jsonUser = await users.json(); console.log(jsonUser);
        let isUser = jsonUser[0] != undefined;
        
        if (isUser) {const id = jsonUser[0].id; navigate(`/home/${id}`);console.log(jsonUser); }
        
         else alert('User not found');


    }








    return (

        <div className='loginContaner'>

            <input type='text' placeholder='Name...' onChange={(event) => { setUserName(event.target.value) }} />
            <input type='password' onChange={(event) => { setPassword(event.target.value) }} />
            <input type='button' onClick={checkUser} value={"Login"}/>



        </div>


    )
}
