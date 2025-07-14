import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import LogoutButton from "../components/LogoutButton";

// To-Do 항목을 위한 타입 정의
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function HomePage() {
  const { username, email } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // 새로운 할 일 추가 핸들러
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };

  // 할 일 완료/미완료 토글 핸들러
  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 할 일 삭제 핸들러
  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>My Dashboard</h2>
        <LogoutButton />
      </header>

      <main style={styles.main}>
        {/* 사용자 프로필 카드 */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>프로필</h3>
          <p><strong>이름:</strong> {username || "..."}</p>
          <p><strong>이메일:</strong> {email || "..."}</p>
        </div>

        {/* 할 일 목록 카드 */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>오늘의 할 일</h3>
          <form onSubmit={handleAddTodo} style={styles.todoForm}>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="새로운 할 일을 입력하세요"
              style={styles.todoInput}
            />
            <button type="submit" style={styles.todoButton}>
              추가
            </button>
          </form>
          <ul style={styles.todoList}>
            {todos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  ...styles.todoItem,
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                <span onClick={() => handleToggleTodo(todo.id)} style={{ cursor: "pointer" }}>
                  {todo.text}
                </span>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  style={styles.deleteButton}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

// 스타일 객체
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    background: "#f0f2f5",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "#fff",
    borderBottom: "1px solid #ddd",
  },
  main: {
    padding: "2rem",
    display: "grid",
    gap: "2rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  },
  card: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: "1rem",
    borderBottom: "1px solid #eee",
    paddingBottom: "0.5rem",
  },
  todoForm: {
    display: "flex",
    marginBottom: "1rem",
  },
  todoInput: {
    flex: 1,
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  todoButton: {
    padding: "0.5rem 1rem",
    border: "none",
    background: "#007bff",
    color: "#fff",
    borderRadius: "4px",
    marginLeft: "0.5rem",
    cursor: "pointer",
  },
  todoList: {
    listStyle: "none",
    padding: 0,
  },
  todoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 0",
    borderBottom: "1px solid #eee",
  },
  deleteButton: {
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "0.3rem 0.6rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default HomePage;
