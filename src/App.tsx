import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import NoteList from './components/NoteList/NoteList';
import './App.css';
import { getNotes, createNote, deleteNote, updateNote, Note } from './http/api';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }

    getNotes()
      .then((fetchedNotes) => {
        setNotes(fetchedNotes);
        localStorage.setItem('notes', JSON.stringify(fetchedNotes));
      })
      .catch(error => {
        console.error('There was an error fetching the notes!', error);
      });
  }, []);

  const handleAddNote = () => {
    const newNote = { content: '', x: 0, y: 0, width: 150, height: 150 };
    createNote(newNote)
      .then((createdNote) => {
        const updatedNotes = [...notes, createdNote];
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
      })
      .catch(error => {
        console.error('There was an error creating the note!', error);
      });
  };

  const handleDeleteNote = (id: number) => {
    deleteNote(id)
      .then(() => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
      })
      .catch(error => {
        console.error('There was an error deleting the note!', error);
      });
  };

  const handleUpdateNote = (id: number, content: string, x: number, y: number, width: number, height: number) => {
    const updatedNote = { content, x, y, width, height };
    updateNote(id, updatedNote)
      .then(() => {
        const updatedNotes = notes.map((note) => (note.id === id ? { ...note, content, x, y, width, height } : note));
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
      })
      .catch(error => {
        console.error('There was an error updating the note!', error);
      });
  };

  return (
    <div className="app">
      <div className="header">
        <Button className="add-note-button" onClick={handleAddNote}>
          Add Note
        </Button>
      </div>
      <NoteList notes={notes} onDelete={handleDeleteNote} onUpdate={handleUpdateNote} />
    </div>
  );
};

export default App;
