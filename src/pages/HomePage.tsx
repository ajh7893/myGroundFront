import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LogoutButton from "../components/LogoutButton";
import type { Todo } from "../api/todoApi";
import {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
} from "../api/todoApi";

function HomePage() {
  const { username, email } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const fetchedTodos = await getTodos();
        setTodos(fetchedTodos);
        setError(null);
      } catch (err) {
        setError("할 일 목록을 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const newTodoItem = await addTodo(newTodo);
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    } catch (err) {
      setError("할 일을 추가하는데 실패했습니다.");
      console.error(err);
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      const updatedTodo = await toggleTodo(id);
      setTodos(
        todos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      setError("할 일 상태를 변경하는데 실패했습니다.");
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("할 일을 삭제하는데 실패했습니다.");
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>My Dashboard</h2>
        <LogoutButton />
      </header>

      <main style={styles.main}>
        {/* 게시판 바로가기 카드 */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>게시판</h3>
          <p>다른 사용자들과 소통해보세요.</p>
          <Link to="/boards" style={styles.linkButton}>게시판으로 이동</Link>
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
              disabled={loading}
            />
            <button type="submit" style={styles.todoButton} disabled={loading}>
              {loading ? "추가 중..." : "추가"}
            </button>
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {loading && !error && <p>로딩 중...</p>}

          {!loading && !error && todos.length === 0 && (
            <p>오늘의 할 일이 없습니다. 새로운 할 일을 추가해보세요!</p>
          )}

          {!loading && todos.length > 0 && (
            <ul style={styles.todoList}>
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  style={{
                    ...styles.todoItem,
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#888" : "#333",
                  }}
                >
                  <span
                    onClick={() => handleToggleTodo(todo.id)}
                    style={{ cursor: "pointer", flexGrow: 1 }}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    style={styles.deleteButton}
                    disabled={loading}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          )}
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
  linkButton: {
    display: "inline-block",
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    background: "#28a745",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
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
