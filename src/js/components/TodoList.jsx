import React, { useState, useEffect } from "react";

const TodoList = () => {
    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");

    // Leer tareas
    function leerTareas() {
        fetch("https://playground.4geeks.com/todo/users/Yenimar")
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data.todos)) {
                    setTareas(data.todos);
                } else {
                    console.error("Formato de datos incorrecto", data);
                }
            })
            .catch((error) => console.error("Error al leer tareas:", error));
    }

    // Agregar tarea
    function agregarTarea(idTodo) {

        const nuevaTarea = { label: nuevaTarea, done: false };

        fetch("https://playground.4geeks.com/todo/todos/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaTarea),
        })
            .then((response) => response.json())
            .then(() => {
                setNuevaTarea("");
                leerTareas(); // Recargar la lista después de agregar
            })
    }

    // Eliminar tarea
    function eliminarTarea(idtodo) {
        fetch(`https://playground.4geeks.com/todo/todos/${idtodo}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    leerTareas(); // Recargar la lista tras eliminar
                } else {
                    console.error("Error al eliminar la tarea");
                }
            })
            .catch((error) => console.error("Error en la eliminación:", error));
    }

    // Cargar tareas al inicio
    useEffect(() => {
        leerTareas();
    }, []);

    return (
        <>
            <h1>Lista de TODOS</h1>
            <input
                type="text"
                value={nuevaTarea}
                onChange={(e) => setNuevaTarea(e.target.value)}
                placeholder="Escribe la nueva tarea"
            />
            <button onClick={agregarTarea}>Agregar Tarea</button>
            <button onClick={leerTareas}>Leer Lista de Tareas</button>

            {tareas.length > 0 ? (
                tareas.map((todo) => (
                    <div key={todo.id}>
                        <p>
                            Tarea: {todo.label} 
                            <button onClick={() => eliminarTarea(todo.id)}>Eliminar</button>
                        </p>
                    </div>
                ))
            ) : (
                <p>No hay tareas disponibles</p>
            )}
        </>
    );
};

export default TodoList;
