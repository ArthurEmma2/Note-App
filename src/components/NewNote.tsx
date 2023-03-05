import { NewNoteForm } from "./NewNoteForm";
import { NoteData, Tag } from "../App";
type newNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

function NewNote({ onSubmit, onAddTag, availableTags }: newNoteProps) {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NewNoteForm
        onAddTag={onAddTag}
        availableTags={availableTags}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default NewNote;
