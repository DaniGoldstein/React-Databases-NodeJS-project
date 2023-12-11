
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

const Posts =()=>{
const {id}=useParams();
const [displayPosts,setDisplayPosts]=useState([]);


async function getMyPosts(){
    let posts = await fetch(`http://localhost:3500/posts?userId=${id}`);
        let jsonPosts = await posts.json();
        setDisplayPosts(jsonPosts);
}

useEffect(()=>{

getMyPosts()

},[]);

return (displayPosts.map((post,key)=>
    <div>{post.title}</div>
))
}

export default Posts