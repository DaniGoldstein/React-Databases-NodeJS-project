import React from "react";
import {  useNavigate } from 'react-router-dom';



const Logout = () => {
const navigate = useNavigate();
    return (<>
        <button style={{fontSize : "30px",marginTop:"20px", marginLeft:"10px"}} onClick={() => {
            localStorage.removeItem('auth');
             navigate('/');            
        }}> Logout</button>

    </>);



};

export default Logout;