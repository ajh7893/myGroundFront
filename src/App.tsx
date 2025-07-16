import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import BoardListPage from "./pages/BoardListPage";
import BoardWritePage from "./pages/BoardWritePage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/boards"
        element={
          <ProtectedRoute>
            <BoardListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/boards/write"
        element={
          <ProtectedRoute>
            <BoardWritePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
