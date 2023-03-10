import React, { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import useLocalStorage from "./components/hooks/useLocalStorage";
import NoteList from "./components/NoteList";
import NoteLayout from "./NoteLayout";
import { v4 as uuidV4 } from "uuid";

import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NewNote from "./components/NewNote";
import { Container } from "react-bootstrap";
import Note from "./Note";
import Edit from "./Edit";
import EditNote from './components/EditNote';


export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const navigate = useNavigate()

  const noteWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }


  function DeleteBtn (id:string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  function onUpadateNote(id:string, {tags, ...data}: NoteData){
    setNotes((prevNotes) => {
      return prevNotes.map(note =>{
       if(note.id === id) {
          return    { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
       } else{
        return note
       }
      })
    });
  }


  function updateTag(id:string, label:string){
    setTags(prevTags => {
      return prevTags.map((tag) =>{
        if(tag.id === id){
          return {...tag, label }
        }else{
          return tag
        }
      })
    })
  }


  function deleteTag (id:string){
    setTags(prevTags =>{
      return prevTags.filter(tag => tag.id !== id)
    })
  }


  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList onUpdateTag={updateTag}  onDeleteTag={deleteTag} notes={noteWithTags} availableTags={tags} />}
        />
        <Route
          path="/new"
          element={
            <NewNote
              onAddTag={addTag}
              availableTags={tags}
              onSubmit={onCreateNote}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={noteWithTags} />}>
          <Route path="edit" element={<EditNote 
            availableTags={tags}
            onSubmit={onUpadateNote} onAddTag={addTag} />} />
          <Route index element={<Note  OnDeleteBtn={DeleteBtn} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Container>
  );
};

export default App;
