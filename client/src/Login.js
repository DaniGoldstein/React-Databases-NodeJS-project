import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';




export default function Login(props) {


    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    async function checkUser() {
      
        try {
          const response = await axios.get(`http://localhost:3500/login?userName=${userName}&password=${password}`);
          const user = await response.data; // Assuming the user data is directly available in response.data
          
      
          if (user.userExist) {console.log(user);
            localStorage.setItem('auth',`${userName}:${password}`);
            const id = parseInt(user.userid);
            navigate(`/home/${id}`);
            
          } else {
            alert('User not found');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      








    return (

        <div className='loginContaner'>

            <input type='text' placeholder='Name...' onChange={(event) => { setUserName(event.target.value) }} />
            <input type='password' onChange={(event) => { setPassword(event.target.value) }} />
            <input type='button' onClick={checkUser} value={"Login"}/>



        </div>


    )
}
