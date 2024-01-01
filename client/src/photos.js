import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Photos =()=>{
const {id}=useParams();
const [displayPhotos,setDisplayPhotos]=useState([]);


async function getMyP(){
    let posts = await fetch(`http://localhost:3500/photos?userId=${id}`);
        let jsonPosts = await posts.json();
        setDisplayPhotos(jsonPosts);
}

useEffect(()=>{

getMyP()

},[]);

return (
    <><Link to={`/Home/${id}`}>To Home Page </Link>
  {  displayPhotos.map((photo,key)=>
    <div>
    <img src={photo.url}/>
    </div>)}  </>
)

}

export default Photos