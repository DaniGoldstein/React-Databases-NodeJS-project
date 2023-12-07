



import React from "react"
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
        getFitrstToDos();
    }, []);
    async function getFitrstToDos() {
        let toDos = await fetch(`http://localhost:3500/todos?userId=${id}`);
        let jsonTodos = await toDos.json();
        setMyToDos(jsonTodos);
        setDisplayToDos(jsonTodos);
    }
    async function getToDos() {
        let toDos = await fetch(`http://localhost:3500/todos?userId=${id}`);
        let jsonTodos = await toDos.json();
        setMyToDos(jsonTodos);
    }
    async function getToDos() {
        let toDos = await fetch(`http://localhost:3500/todos?userId=${id}`);
        let jsonTodos = await toDos.json();
        setMyToDos(jsonTodos);
    }
    const deleteToDo = async (idTodo) => {
        await fetch(`http://localhost:3500/todos/${idTodo}`,
            { method: 'DELETE' });
        getToDos();
        setDisplayToDos(displayToDos.filter(todo => todo.id != idTodo))
    }
    const completedToDo = async (idTodo, index) => {
        await fetch(`http://localhost:3500/todos/${idTodo}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: true })
            });
        getToDos();
        displayToDos[index].completed = true;
    }
    const addToDo = async () => {
        const body = {
            userId: id,
            title: newToDO,
            completed: false
        }
        const mypost = await fetch(`http://localhost:3500/todos`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        getToDos();
        document.getElementById("placeHolder").value = "";
        console.log(myToDos);
        setDisplayToDos([...displayToDos, myToDos[myToDos.length - 1]])
        console.log(displayToDos);
    }
    const sortToDosABC = () => {
        let arr = Array.from(displayToDos, (item) => item);
        arr = arr.sort((a, b) => a.title.localeCompare(b.title)); console.log(arr);
        setDisplayToDos(arr)
    }
    const orderOfToDos = () => { setDisplayToDos(myToDos) };
    const selectCompleted = () => { setDisplayToDos(displayToDos.filter((todo) => todo.completed == false)) }
    const setSearchText = (event) => {
        let inputText = event.target.value;
        setSearch(inputText);
    }
    return (<div>
        <div><input type="text" placeholder="Search ToDo" onChange={setSearchText}></input>
            <button onClick={() => { setDisplayToDos(myToDos.filter((toDo) => toDo.title.includes(searchText))) }}></button></div>
        <div className="controlToDos">
            <button onClick={orderOfToDos} >All my ToDos</button>
            <button onClick={sortToDosABC}>Sort ToDos ABC...</button>
            <button onClick={selectCompleted}>Un completed</button>
        </div>
        <Link to={`/Home/${id}`}>To Home Page</Link>
        <br />
        <table className="toDosTable">
            {displayToDos.length > 0 ? displayToDos.map((toDo, key) =>
                <tr>
                    {toDo.completed ?
                        <td> ✔️ </td> :
                        <td> <input type="checkbox" onClick={() => { completedToDo(toDo.id, key) }} /></td>}
                    {key} {toDo.title} <td onClick={() => deleteToDo(toDo.id)}> 🗑️ </td>
                </tr>) : null}
            <tr><td></td><td><input type="text" id="placeHolder" placeholder="Add ToDo..." onChange={(event) => setNewToDo(event.target.value)} /></td>
                <td><input type="button" onClick={addToDo} /> </td> </tr>
        </table>
    </div>)
}
export default ToDos;



}
export default ToDos;
