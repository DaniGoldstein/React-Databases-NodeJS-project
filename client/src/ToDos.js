import React from "react"
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import HomeLink from "./homeLink";
const ToDos = () => {
    const { id } = useParams();

    const [newToDO, setNewToDo] = useState('');

    const [searchText, setSearch] = useState('')

    const [myToDos, setMyToDos] = useState([]);

    const [displayToDos, setDisplayToDos] = useState([]);

    // const [editWindows, setEditWindows] = useState(Array(displayToDos.length).fill(false));

    const [editedTitles, setEditedTitles] = useState({});


const navigate = useNavigate();

    useEffect(() => {
        getFirstToDos();
    }, []);


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
              navigate('/');
              return;
            }
          } catch (err) {
            console.log(err);
            
            navigate('/');
          }
        })();
      }, []);

   

    async function getFirstToDos() {
        try {
            const response = await axios.get(`http://localhost:3500/todos?userId=${id}`);
            const jsonTodos = response.data;
            setMyToDos(jsonTodos);
            setDisplayToDos(jsonTodos);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function getToDos() {
        try {
            const response = await axios.get(`http://localhost:3500/todos?userId=${id}`);
            const jsonTodos = response.data;
            setMyToDos(jsonTodos);
            setDisplayToDos(jsonTodos);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const deleteToDo = async (idTodo) => {
        try {
            const response = await axios.delete(`http://localhost:3500/todos/delete/${idTodo}`, {

                headers: {
                    "userid": `${id}`,
                    "auth": `${localStorage.getItem('auth')}`

                }
            });

            const todos = response.data;

            console.log(todos);
            setMyToDos(todos);
            setDisplayToDos(displayToDos.filter(todo => todo.id !== idTodo));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };



    const completedToDo = async (idTodo, index) => {
        const response = await axios.patch(`http://localhost:3500/todos/updateCompleted/${idTodo}`,
            {
                completed: true,
                userId: `${id}`
            },
            {
                headers: {
                    'auth': ''
                }
            }).catch(error => { console.log(error); });
        const todos = response.data;
        console.log(todos);
        setMyToDos(todos);
        displayToDos[index].completed = true;
    }



    const addToDo = async () => {
        const body = {
            userId: id,
            title: newToDO,
            completed: false
        };

        try {
            const response = await axios.post(`http://localhost:3500/todos`, body, {
                headers: {
                    "Content-Type": "application/json",
                    "userid": `${id}`,
                    "auth": `${localStorage.getItem('auth')}`


                }
            });
            const todos = response.data;
            console.log(todos);
            setMyToDos(todos);

            document.getElementById("placeHolder").value = "";
            alert("Click Show All to see the new task");
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const editTodo = async (idTodo, key) => {


        try {
            const updatedTitle = editedTitles[key] || displayToDos[key].title;
    
         
            const response = await axios.patch(
                `http://localhost:3500/todos/updateTodos/${idTodo}`,
                { title: updatedTitle,userId: id  },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "userid": `${id}`,
                        "auth": `${localStorage.getItem('auth')}`
                    }
                }
            );
            const updatedTodos = response.data;
            setMyToDos(updatedTodos);

            setDisableElement(''); 
            
            
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };
    
    const [disableElement,setDisableElement]=useState('');
    const setDisableElementHandler = (key) => {
        setDisableElement(key);
      };
      const handleTitleChange = (key, value) => {
        setEditedTitles((prevTitles) => ({
          ...prevTitles,
          [key]: value,
        }));console.log(editedTitles);
      };
   

    const sortToDosABC = () => {
        let arr = Array.from(displayToDos, (item) => item);
        arr = arr.sort((a, b) => a.title.localeCompare(b.title)); console.log(arr);
        setDisplayToDos(arr)
    }

    const sortUnCompletedFirst = () => {
        let arr = Array.from(displayToDos, (item) => item);
        arr = arr.sort((a, b) => a.completed - b.completed);
        setDisplayToDos(arr)
    }


    const orderOfToDos = () => { setDisplayToDos(myToDos) };

    const selectUnCompleted = () => { setDisplayToDos(myToDos.filter((todo) => todo.completed == false)) }
    const selectCompleted = () => { setDisplayToDos(myToDos.filter((todo) => todo.completed == true)) }
    const setSearchText = (event) => {
        let inputText = event.target.value;
        setSearch(inputText);
    }


    const search = () => {
        setDisplayToDos(displayToDos.filter((toDo) => toDo.title.includes(searchText)))
    }

    return (<div>

       <HomeLink id={id}/>

        <div className="searchToDo"><input type="text" placeholder="Search ToDo" onChange={setSearchText}></input>
            <button onClick={search}> 🔍 </button></div>


        <div className="filterToDo">
            <button onClick={orderOfToDos} >Show all</button>
            <hr></hr>
            <h3>Filter</h3>
            <div className="filterOptions">
                <button onClick={selectUnCompleted}>Un completed</button>
                <button onClick={selectCompleted}>Completed</button>
            </div>
        </div>


        <div className="sortTodos">
            <h3> Sort</h3>
            <div className="sortOptions">
                <button onClick={sortToDosABC}> ABC...</button>
                <button onClick={sortUnCompletedFirst}> Undone first</button></div>
        </div>

        <div className="addTodo">

            <input type="text" id="placeHolder" placeholder="Add ToDo..." onChange={(event) => setNewToDo(event.target.value)} />
            <input className="addTodoBtton" type="button" onClick={addToDo} value={"Add"} />

        </div>


        <table className="toDosTable">
        {displayToDos.length > 0 ? displayToDos.map((toDo, key) =>
          <tr key={key}>
            {toDo.completed ?
              <td> ✔️ </td> :
              <td> <input type="checkbox" onClick={() => { completedToDo(toDo.id, key) }} /></td>}
            <td> {toDo.id} </td>
            <input
              type="text"
              className="editTodo"
              value={editedTitles[key] || toDo.title}
              onChange={(e) => handleTitleChange(key, e.target.value)}
              disabled={disableElement !== toDo.id}
            />
            <td onClick={() => deleteToDo(toDo.id)}> 🗑️ </td>
           { disableElement !== toDo.id ?<td onClick={() => setDisableElementHandler(toDo.id)}> ✏️ </td>
             :<div onClick={() => editTodo(toDo.id, key)}> ➡️ </div>}
            
          </tr>
        ) : null}
      </table>
    </div>)
}
export default ToDos;


