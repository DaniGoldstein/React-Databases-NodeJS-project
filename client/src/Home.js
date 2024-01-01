import{Link, Route, Routes} from 'react-router-dom'
import ToDos from './ToDos'
import { useParams } from 'react-router-dom';
import { useState , useEffect} from 'react';

function Home(props) {

const { id }=useParams();

const[ userName ,setName]=useState("");

async function getUserName() {

  let name = await fetch(`http://localhost:3500/users?id=${id}`);
  let jsonName = await name.json();
  setName(jsonName[0].name);
  
}

useEffect(() => { getUserName();}, [])

return(<div className='homeBody'>
     <h1>Welcome {userName}</h1>
     
<div className='linksMenu'>

    <Link to={`/Home/toDos/${id}`}>ToDos</Link>
    <Link to={`/Home/albums/${id}`}>Albums</Link>
    <Link to={`/Home/posts/${id}`}>Posts</Link>
    <Link to={`/Home/photos/${id}`}>Photos</Link>

</div>
    <Routes>
      
 
    </Routes></div>
)

   

}

export default Home;

