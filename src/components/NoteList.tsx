import React, { useMemo, useState } from "react";
import { Col, Row, Stack, Button, Form, Card, Badge, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { Tag } from "../App";
import { Note } from "../App";
import ReactSelect from "react-select";
import styles from '../NoteList.module.css'

export type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
};

export type SimplifiedNote = {
  id: string;
  title: string;
  tags: Tag[];
};


type ModalProps = {
  show: boolean
  availableTags: Tag[]
  handleClose: ()=> void
}

function NoteList({ availableTags, notes }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredNote = useMemo(() => {
    return notes.filter((note) => {
      return (
        title === "" ||
        (note.title.toLowerCase().includes(title.toLowerCase()) &&
          (selectedTags.length === 0 ||
            selectedTags.every((tag) =>
              note.tags.some((noteTag) => noteTag.id === tag.id)
            )))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row>
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant="outline-secondary" onClick={() => setIsModalOpen(true)}>Edit Tags</Button>
          </Stack>
        </Col>
      </Row>

      <Form>
        <Row className="mt-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                isMulti
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
              ></ReactSelect>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNote.map((note) => (
          <Col>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
        <Col></Col>
      </Row>
      <EditTagModal show={false} availableTags= {availableTags}  handleClose={() => setIsModalOpen(true)}/>
    </>
  );
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
    return (
        <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none mt-5 ${styles.card}`}>
            <Card.Body>
                <Stack gap={2}  className='align-items-center justify-content-center h-100'>
                     <span className="fx-5">{title}</span>

                     {tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
                        {
                            tags.map((tag) =>(
                                <Badge className="text-truncate" key={tag.id}>{tag.label}</Badge>
                            ))
                        }
                        </Stack>
                     )}
                </Stack>
            </Card.Body>
        </Card>
    )
}

export default NoteList;


function EditTagModal({availableTags, handleClose, show}: ModalProps){
  return <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit tags</Modal.Title>
      <Modal.Body>
        <form>
          <Stack gap={2}>
          {
  availableTags.map(tag => {
    return(
      <Row key={tag.id}>
      <Col key={tag.id}>
      <Form.Control type="text" value={tag.label}  />
      </Col>
      <Col xs="auto">
        <Button variant="outline-danger"><i className="fa fa-times" aria-hidden="true"></i></Button>
      </Col>
    </Row>
    )
  
  })
}
          </Stack>
        </form>
      </Modal.Body>
    </Modal.Header>
  </Modal>

}


