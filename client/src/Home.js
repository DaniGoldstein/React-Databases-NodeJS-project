import{Link, Route, Routes} from 'react-router-dom'
import ToDos from './ToDos'
import { useParams, useNavigate } from 'react-router-dom';
import { useState , useEffect} from 'react';
import axios from 'axios';
import Logout from './logout';




function Home(props) {

const navigate = useNavigate();

const { id }=useParams();

const[ userName ,setName]=useState("");

useEffect(() => {
  (async () => {
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
      console.log(isExisting);

      if (!isExisting) {
        navigate('/login');
        return;
      }
    } catch (err) {
      console.log(err);
      navigate('/login');
    }
  })();
}, []);

async function getUserName() {

  
  
  const name = await axios.get(`http://localhost:3500/user/${id}`); 
  const user = await name.data; 
  console.log(user);
  setName(user);
  
}

useEffect(() => { getUserName();}, [])

return(<div className='homeBody'>
  {/* <Logout/> */}
     <h1>Welcome {userName}</h1>
     
<div className='linksMenu'>

    <Link to={`/Home/toDos/${id}`}>Todos</Link>
    <Link to={`/Home/albums/${id}`}>Albums</Link>
    <Link to={`/Home/posts/${id}`}>Posts</Link>
    <Link to={`/Home/photos/${id}`}>Photos</Link>

</div>
    <Routes>
      
 
    </Routes></div>
)

   

}

export default Home;

