
import api from "./axios";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get("/api/todos");
  return response.data;
};

export const addTodo = async (text: string): Promise<Todo> => {
  const response = await api.post("/api/todos", { text });
  return response.data;
};

export const toggleTodo = async (id: number): Promise<Todo> => {
  const response = await api.patch(`/api/todos/${id}/toggle`);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/api/todos/${id}`);
};
