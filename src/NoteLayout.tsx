import React from "react";
import { Note } from "./App";
import {
  useParams,
  Navigate,
  Outlet,
  useOutletContext,
} from "react-router-dom";

type NoteLayoutProps = {
  notes: Note[];
};

function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams();
  const note = notes && notes.find((n) => n.id === id);
  if (!note) {
    return <Navigate to="/" replace />;
  }
  return <Outlet context={note} />;
}
export default NoteLayout;

export function useNote() {
  return useOutletContext<Note>();
}
