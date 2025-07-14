import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

// 사용자 인증 상태를 위한 타입 정의
interface AuthContextType {
  username: string;
  email: string; // email 추가
  setUsername: (name: string) => void;
  setEmail: (email: string) => void; // setEmail 추가
}

// Context 초기값 설정
const AuthContext = createContext<AuthContextType>({
  username: "",
  email: "", // email 초기값 추가
  setUsername: () => {},
  setEmail: () => {}, // setEmail 초기값 추가
});

// 전체 앱에서 인증 상태를 공유할 수 있게 해주는 Provider 컴포넌트
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // email 상태 추가

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      api
        .get("/api/user/me")
        .then((res) => {
          setUsername(res.data.username);
          setEmail(res.data.email); // email 상태 업데이트
        })
        .catch((err) => {
          console.error("사용자 정보 불러오기 실패:", err);
        });
    }
  }, []);

  // 하위 컴포넌트에 username, email, setUsername, setEmail 전달
  return (
    <AuthContext.Provider value={{ username, email, setUsername, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

// 다른 컴포넌트에서 인증 상태를 쉽게 사용하도록 하는 훅
export const useAuth = () => useContext(AuthContext);
