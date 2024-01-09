import React from 'react'
import { Link } from "react-router-dom";
export default function homeLink(props) {
  return (
    <div>
       <Link to={`/Home/${props.id}`}><div style={{fontSize:"80px", position:"absolute",color:"black" , left:"150px", top:"-25px"}}>⌂</div></Link>
    </div>
  )
}
