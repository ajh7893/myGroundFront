
import api from "./axios";

export interface Board {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

// 게시글 목록 조회
export const getBoards = async (): Promise<Board[]> => {
  const response = await api.get("/api/boards");
  return response.data;
};

// 게시글 상세 조회
export const getBoardById = async (id: number): Promise<Board> => {
  const response = await api.get(`/api/boards/${id}`);
  return response.data;
};

// 게시글 생성
export const createBoard = async (board: { title: string; content: string }): Promise<Board> => {
  const response = await api.post("/api/boards", board);
  return response.data;
};
