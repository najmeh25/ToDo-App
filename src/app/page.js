"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    setTodos([...todos, { text: inputValue.trim(), completed: false }]);
    setInputValue("");
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index, e) => {
    e.stopPropagation();
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTodo();
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>ToDo</h1>
      <div className={styles.inputSection}>
        <input
          type="text"
          placeholder="add a new todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={addTodo}>Add todo</button>
      </div>

      <ul className={styles.todoList}>
        {todos.map((todo, index) => (
          <li
            key={index}
            className={todo.completed ? styles.completed : ""}
            onClick={() => toggleComplete(index)}
          >
            {todo.text}
            <button onClick={(e) => deleteTodo(index, e)}>deleteTodo</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
