import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const Albums=()=>{

    const {id}=useParams();
    const [displaAlbums,setDisplayAlbums]=useState([]);
    
    
    async function getMyAlbum(){
        let albums = await fetch(`http://localhost:3500/albums?userId=${id}`);
            let jsonAlbum = await albums.json();
            setDisplayAlbums(jsonAlbum);
    }
    
    useEffect(()=>{
    
    getMyAlbum()
    
    },[]);
    
    return (<>
    <Link to={`/Home/${id}`}>To Home Page </Link>{displaAlbums.map((album,key)=>
        <div>{album.title}</div>
    )}</>)
    
    
   

}

export default Albums