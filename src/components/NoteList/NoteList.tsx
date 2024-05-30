import React from 'react';
import Note from '../Note/Note';
import {Note as NoteType} from '../../http/api';
import './NoteList.css';

interface NoteListProps {
  notes: NoteType[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, content: string, x: number, y: number, width: number, height: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDelete, onUpdate }) => {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id!}
          content={note.content}
          x={note.x}
          y={note.y}
          width={note.width}
          height={note.height}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default NoteList;
