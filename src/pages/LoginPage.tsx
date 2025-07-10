import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅

const LoginPage = () => {
  const navigate = useNavigate(); // 페이지 이동 함수
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 폼 제출 시 실행되는 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 기본 제출 동작 막기

    try {
      // 백엔드로 로그인 요청 보내기
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      // 응답에서 accessToken, refreshToken 꺼내기
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      // 에러 초기화
      setError("");

      // 메인 페이지로 이동
      navigate("/");
    } catch (err: any) {
      // 로그인 실패 시 에러 메시지 표시
      setError("로그인 실패: 아이디 또는 비밀번호를 확인하세요");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* 에러가 있을 경우 메시지 표시 */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
