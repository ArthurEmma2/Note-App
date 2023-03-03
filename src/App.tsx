import React, { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, Navigate } from "react-router-dom";
import useLocalStorage from "./components/hooks/useLocalStorage";
import NoteList from "./components/NoteList";
import NoteLayout from "./NoteLayout";
import { v4 as uuidV4 } from "uuid";

import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NewNote from "./components/NewNote";
import { Container } from "react-bootstrap";
import Note from "./Note";

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

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList notes={noteWithTags} availableTags={tags} />}
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
          <Route path="edit" element={<h1>Edit</h1>} />
          <Route index element={<Note />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Container>
  );
};

export default App;
