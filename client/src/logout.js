import React from "react";
import {  useNavigate } from 'react-router-dom';


const Logout = () => {
const navigate = useNavigate();
    return (<>
        <button style={{fontSize : "30px",position: ""}} onClick={() => {
            localStorage.removeItem('auth');
             navigate('/');            
        }}> logout</button>

    </>);



};

export default Logout;