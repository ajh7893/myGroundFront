// 인증이 필요한 라우트를 감싸주는 컴포넌트입니다
// 로그인 상태가 아니라면 /login으로 redirect 합니다

import React from "react";
import { Navigate } from "react-router-dom";

// props로 children(보호받을 컴포넌트)을 받습니다
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // 로그인 상태 확인: 토큰이 localStorage에 있는지 확인
  const isAuthenticated = !!localStorage.getItem("accessToken");

  // 로그인 상태면 children 렌더링, 아니면 /login으로 이동
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
