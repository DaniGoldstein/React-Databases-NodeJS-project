import React from "react"
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
const ToDos = () => {
    const { id } = useParams();

    const [newToDO, setNewToDo] = useState('');

    const [searchText, setSearch] = useState('')

    const [myToDos, setMyToDos] = useState([]);

    const [displayToDos, setDisplayToDos] = useState([]);

    useEffect(() => {
        getFirstToDos();
    }, []);




    // async function getFitrstToDos() {

    //     let toDos = await fetch(`http://localhost:3500/todos?userId=${id}`);
    //     let jsonTodos = await toDos.json();
    //     setMyToDos(jsonTodos);
    //     setDisplayToDos(jsonTodos);
    // }

    async function getFirstToDos() {
        try {
            const response = await axios.get(`http://localhost:3500/todos?userId=${id}`);
            const jsonTodos = response.data;console.log(jsonTodos);
            setMyToDos(jsonTodos);
            setDisplayToDos(jsonTodos);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // async function getToDos() {
    //     let toDos = await fetch(`http://localhost:3500/todos?userId=${id}`);
    //     let jsonTodos = await toDos.json();
    //     setMyToDos(jsonTodos);
    // }


    // async function getToDos() {
    //     let toDos = await fetch(`http://localhost:3500/todos?userId=${id}`);
    //     let jsonTodos = await toDos.json();
    //     setMyToDos(jsonTodos);
    // }

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
           const response =  await axios.delete(`http://localhost:3500/todos/delete/${idTodo}`, {
           
           headers : {
            "userid": `${id}`
           }});
           const todos = response.data;
           console.log(todos);
           setMyToDos(todos);
            setDisplayToDos(displayToDos.filter(todo => todo.id !== idTodo));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    // const deleteToDo = async (idTodo) => {
    //     await fetch(`http://localhost:3500/todos/${idTodo}`,
    //         { method: 'DELETE' });
    //     getToDos();
    //     setDisplayToDos(displayToDos.filter(todo => todo.id != idTodo))
    // }

    const completedToDo = async (idTodo, index) => {
        await axios.patch(`http://localhost:3500/todos/updateCompleted/${idTodo}`, { completed: true }, 
            {
                headers: {
                    'auth': ''
                }     
            }).catch(error => {console.log(error);});
        getToDos();
        displayToDos[index].completed = true;
    }

    // const completedToDo = async (idTodo, index) => {
    //     try {
    //         await axios.patch(`http://localhost:3500/todos/${idTodo}`, { completed: true });
    //         getToDos();
    //         displayToDos[index].completed = true;
    //     } catch (error) {
    //         console.error('Error completing todo:', error);
    //     }
    // };

    // const addToDo = async () => {
    //     const body = {
    //         userId: id,
    //         title: newToDO,
    //         completed: false
    //     }
    //     const mypost = await fetch(`http://localhost:3500/todos`, {
    //         method: 'POST',
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(body)
    //     })
    //     getToDos();
    //     document.getElementById("placeHolder").value = "";
    //     alert("Click Show All to see the new task")
    // }

    const addToDo = async () => {
        const body = {
            userId: id,
            title: newToDO,
            completed: false
        };

        try {
            const response = await axios.post(`http://localhost:3500/todos`, body, {
                headers: { "Content-Type": "application/json" }
            });
            getToDos();
            document.getElementById("placeHolder").value = "";
            alert("Click Show All to see the new task");
        } catch (error) {
            console.error('Error adding todo:', error);
        }
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

        <Link to={`/Home/${id}`}>To Home Page </Link>

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
                <tr>
                    {toDo.completed ?
                        <td> ✔️ </td> :
                        <td> <input type="checkbox" onClick={() => { completedToDo(toDo.id, key) }} /></td>}
                    {key} {toDo.title} <td onClick={() => deleteToDo(toDo.id)}> 🗑️ </td>
                </tr>) : null}
        </table>
    </div>)
}
export default ToDos;






