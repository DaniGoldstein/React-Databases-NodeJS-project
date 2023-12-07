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

useEffect(() => { getUserName(); console.log("ggggggg"); }, [])

return(<>
     <h1>{userName}</h1>

    <Link to={`/Home/toDos/${id}`}>ToDos</Link>

    <Routes>
      
 
    </Routes></>
)

   

}

export default Home;

