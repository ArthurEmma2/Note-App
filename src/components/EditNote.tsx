import { NewNoteForm } from "./NewNoteForm";
import { NoteData, Tag } from "../App";
type EditNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NewNoteForm
        onAddTag={onAddTag}
        availableTags={availableTags}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default EditNote;
