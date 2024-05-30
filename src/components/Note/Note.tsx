import React, { useState } from 'react';
import { Card, Input, Button } from 'antd';
import { CloseOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Rnd } from 'react-rnd';
import ReactMarkdown from 'react-markdown';
import './Note.css';

interface NoteProps {
  id: number;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  onDelete: (id: number) => void;
  onUpdate: (id: number, content: string, x: number, y: number, width: number, height: number) => void;
}

const Note: React.FC<NoteProps> = ({ id, content, x, y, width, height, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteContent, setNoteContent] = useState(content);
  const [position, setPosition] = useState({ x, y });
  const [size, setSize] = useState({ width, height });

  const handleSave = () => {
    setIsEditing(false);
    onUpdate(id, noteContent, position.x, position.y, size.width, size.height);
  };


  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
        onUpdate(id, noteContent, d.x, d.y, size.width, size.height);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        const newWidth = parseInt(ref.style.width);
        const newHeight = parseInt(ref.style.height);
        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: position.x, y: position.y });
        onUpdate(id, noteContent, position.x, position.y, newWidth, newHeight);
      }}
      minWidth={100}
      minHeight={150}
    >
      <Card className={`note-card ${isEditing ? 'editing' : ''}`}>
        <div className="note-content">
          {isEditing ? (
            <Input.TextArea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              autoSize={{ minRows: 4 }}
              onPressEnter={(e) => {
                e.preventDefault();
                setNoteContent((prevContent) => prevContent + '\n');
              }}
              className="textarea-edit"
            />
          ) : (
            <ReactMarkdown>{noteContent}</ReactMarkdown>
          )}
        </div>
        <div className="note-actions">
          {isEditing ? (
            <Button 
              icon={<SaveOutlined />} 
              onClick={(e) => {
                e.stopPropagation(); 
                handleSave();
              }} 
              onMouseDown={(e) => e.stopPropagation()}
            />
          ) : (
            <Button 
              icon={<EditOutlined />} 
              onClick={(e) => {
                e.stopPropagation(); 
                setIsEditing(true);
              }} 
              onMouseDown={(e) => e.stopPropagation()}
            />
          )}
          <Button 
            icon={<CloseOutlined />} 
            onClick={(e) => {
              e.stopPropagation(); 
              onDelete(id);
            }} 
            onMouseDown={(e) => e.stopPropagation()}
          />
        </div>
      </Card>
    </Rnd>
  );
};

export default Note;
