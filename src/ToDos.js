import React from "react"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';





const ToDos = () => {

    const { id } = useParams();

    const [newToDO, setNewToDo] = useState('');

    const [myToDos, setMyToDos] = useState([])

    const [onlyCompleted, setOnlyCompleted] = useState(false);

    const [sortDisplay, setsortTodos] = useState(false);

    useEffect(() => { getToDos(); }, []);


    async function getToDos() {
        let toDos = await fetch(`http://localhost:3500/todos?userId=${id}`);
        let jsonTodos = await toDos.json();
        setMyToDos(jsonTodos);
        
            
        // }
        // myUpData();
    }




    const selectCompleted = async () => {

        let toDos = await fetch(`http://localhost:3500/todos?userId=${id}&&completed=false`);
        let jsonTodos = await toDos.json();
        setMyToDos(jsonTodos);
        setOnlyCompleted(true);
    }



    const sortToDos = () => {
        setsortTodos(true); 
        setMyToDos(myToDos.slice().sort((itemA, itemB) => itemA.title.localeCompare(itemB.title)))

    }




    const deleteToDo = async (idTodo) => {

        await fetch(`http://localhost:3500/todos/${idTodo}`,
            { method: 'DELETE' });

        if (!onlyCompleted) { getToDos(); console.log("not good"); } else { selectCompleted(); console.log("good"); }

    };


    const completedToDo = async (idTodo) => {

        await fetch(`http://localhost:3500/todos/${idTodo}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: true })


                ,
            });
        console.log(onlyCompleted);
        if (!onlyCompleted) { getToDos() } else { selectCompleted() }

    }

    // const myUpData = () => {
    //     if (sortDisplay) {
    //         sortToDos();
    //     }
    // }

    const addToDo = async () => {

        await fetch(`http://localhost:3500/todos`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: id,
                title: newToDO,
                completed: false
            })
        })

        console.log(onlyCompleted);

        if (!onlyCompleted) { getToDos() } else { selectCompleted() }


        document.getElementById("placeHolder").value = "";
    }

   
    let dropdown = "none";



    return (<div>


        <div className="controlToDos">
            <button onClick={() => { getToDos(); setOnlyCompleted(false) }} >All my ToDos</button>
            <button onClick={selectCompleted}>Un completed</button>
            <button onClick={sortToDos}>Sort ToDos</button>
        </div>
        <Link to={`/Home/${id}`}>To Home Page</Link>
        <br />
        <table className="toDosTable">
            {myToDos.length > 0 ? myToDos.map((toDo, key) =>
                <tr>
                    {toDo.completed ?
                        <td> ✔️ </td> :

                        <td> <input type="checkbox" onClick={() => completedToDo(toDo.id)} /></td>}


                    {key+1+"."} {toDo.title} <td onClick={() =>{ deleteToDo(toDo.id);if(sortDisplay)sortToDos()}} > 🗑️ </td>
                </tr>) : null}

            <tr><td></td><td><input type="text" id="placeHolder" placeholder="Add ToDo..." onChange={(event) => setNewToDo(event.target.value)} /></td>
                <td><input type="button" onClick={addToDo} /> </td> </tr>
        </table>
    </div>)




}
export default ToDos;