// src/pages/HomePage.tsx
import { useAuth } from "../contexts/AuthContext";
import LogoutButton from "../components/LogoutButton";

function HomePage() {
  const { username } = useAuth();

  return (
    <div>
      <h1>Welcome, {username || "..."}</h1>{" "}
      {/* 아직 username이 없으면 ... 출력 */}
      <LogoutButton />
    </div>
  );
}

export default HomePage;
