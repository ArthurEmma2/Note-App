import { NewNoteForm } from "./NewNoteForm";
import { NoteData, Tag, Note } from '../App';
import { useNote } from '../NoteLayout';
type EditNoteProps = {
  onSubmit: (id:string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
  const note = useNote()
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NewNoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onAddTag={onAddTag}
        availableTags={availableTags}
        onSubmit={data => onSubmit(note.id, data)}
      />
    </>
  );
}

export default EditNote;
