import React from 'react'
import { useState,useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Details() {

const navigate = useNavigate();
const{id}=useParams();
const [details,setDetails]=useState([]);

  useEffect(() => {
    ( async () => {
       if (!localStorage.getItem('auth')) {
         navigate('/login');
         return;
       }
   
       const user = localStorage.getItem('auth');
       
       try {
         const response = await axios.get(`http://localhost:3500/pathSecurity/${id}`, {
           headers: { 'auth': user }
         });
   
         const isExisting = response.data;
        
   
         if (!isExisting) {
           navigate('/login');
           return;
         }
       } catch (err) {
         console.log(err);
         navigate('/login');
       }
     })()
   }, []);
   
   
   
   async function getUserDetails() {
   
     try{
     const data = await axios.get(`http://localhost:3500/user/${id}`); 
     const user = await data.data; 
     console.log(user);
     setDetails(user);
   }
     
     catch (err) {console.log(err);
     
     
   }}
   
   useEffect(() => { getUserDetails()}, [])
  
  return (
    <div>
     <ul>
        <li>{`Name: ${details.name}`}</li>
        <li>{`UserName: ${details.username}`}</li>
        <li>{`Id: ${details.id}`}</li>
        <li>{`email: ${details.email}`}</li>
        </ul> 

    </div>
  )
}
