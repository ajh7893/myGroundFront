// src/pages/LoginPage.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      setError("");
      navigate("/");
    } catch (err) {
      setError("로그인 실패: 아이디 또는 비밀번호를 확인하세요");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>로그인</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="username">아이디</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

// ✅ 스타일 객체 정의
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f4f4",
  },
  card: {
    width: 350,
    padding: 30,
    borderRadius: 10,
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    background: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 24,
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: 5,
    border: "1px solid #ccc",
    marginTop: 5,
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    background: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    marginTop: 10,
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: 10,
  },
};

export default LoginPage;
