import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Board } from "../api/boardApi";
import { getBoards } from "../api/boardApi";

function BoardListPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setLoading(true);
        const fetchedBoards = await getBoards();
        setBoards(fetchedBoards);
      } catch (err) {
        setError("게시글 목록을 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>게시판</h2>
      <Link to="/boards/write" style={styles.writeButton}>
        글쓰기
      </Link>

      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <ul style={styles.boardList}>
          {boards.map((board) => (
            <li key={board.id} style={styles.boardItem}>
              <Link to={`/boards/${board.id}`} style={styles.boardLink}>
                <h3 style={styles.boardTitle}>{board.title}</h3>
                <p style={styles.boardMeta}>
                  작성자: {board.username} | 작성일:{" "}
                  {new Date(board.createdAt).toLocaleDateString()}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  title: {
    marginBottom: "1.5rem",
  },
  writeButton: {
    display: "inline-block",
    marginBottom: "1.5rem",
    padding: "0.5rem 1rem",
    background: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
  },
  boardList: {
    listStyle: "none",
    padding: 0,
  },
  boardItem: {
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginBottom: "1rem",
  },
  boardLink: {
    textDecoration: "none",
    color: "inherit",
  },
  boardTitle: {
    margin: "0 0 0.5rem 0",
  },
  boardMeta: {
    margin: 0,
    fontSize: "0.9rem",
    color: "#666",
  },
};

export default BoardListPage;
