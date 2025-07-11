import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// 사용자 인증 상태를 위한 타입 정의
interface AuthContextType {
  username: string; // 현재 로그인된 사용자의 이름
  setUsername: (name: string) => void; // 사용자 이름을 변경하는 함수
}

// Context 초기값 설정 (기본값은 비어있는 사용자)
const AuthContext = createContext<AuthContextType>({
  username: "",
  setUsername: () => {},
});

// 전체 앱에서 인증 상태를 공유할 수 있게 해주는 Provider 컴포넌트
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState("");

  // 앱이 처음 렌더링될 때, accessToken이 있으면 사용자 정보를 가져옵니다
  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // 저장된 accessToken 불러오기
    console.log("token:" + token);
    if (token) {
      // accessToken이 있을 경우, 사용자 정보 요청
      axios
        .get("http://localhost:8080/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 담아 전송
          },
          withCredentials: true, // 혹시 CORS credentials 설정이 있다면 이 옵션도 필요
        })
        .then((res) => {
          console.log("suc");
          setUsername(res.data.username); // 응답에서 username을 추출하여 상태 저장
        })
        .catch((err) => {
          console.error("사용자 정보 불러오기 실패:", err); // 에러가 발생하면 로그 출력
        });
    }
  }, []);

  // 하위 컴포넌트에서 사용할 수 있도록 context 값을 전달
  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

// 다른 컴포넌트에서 인증 상태를 쉽게 사용하도록 하는 훅
export const useAuth = () => useContext(AuthContext);
