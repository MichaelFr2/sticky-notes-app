import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/notes';

export interface Note {
  id?: number;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const getNotes = async (): Promise<Note[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createNote = async (note: Note): Promise<Note> => {
  const response = await axios.post(API_URL, note);
  return response.data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateNote = async (id: number, note: Note): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, note);
};
