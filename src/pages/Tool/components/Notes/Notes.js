import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  color: "#000",
  p: 4,
};

const Notes = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [titleError, setTitleError] = useState("");
  const [notesError, setNotesError] = useState("");
  const [addNote, setAddNote] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem("Notes");
    if (savedNotes) {
      setAddNote(JSON.parse(savedNotes));
    }
  }, []);

  const Validation = () => {
    let isValid = true;
    let titleError = "";
    let notesError = "";

    if (!title) {
      titleError = "Please add a title";
      isValid = false;
    }

    if (!notes) {
      notesError = "Please add a notes";
      isValid = false;
    }

    setTitleError(titleError);
    setNotesError(notesError);
    return isValid;
  };

  const handleAdd = () => {
    const isValid = Validation();
    if (isValid) {
      var newNotes = {
        id: new Date().getTime(),
        title: title,
        notes: notes,
      };
      console.log("new category added-->", newNotes);
      var allNotes = [...addNote, newNotes];
      setAddNote(allNotes);
      console.log("Notes-->", addNote);
      var savedNotes = JSON.stringify(allNotes);
      localStorage.setItem("Notes", savedNotes);
      setTitle("");
      setNotes("");
      setOpen(false);
    }
  };

  function handleDelete(listID) {
    const allnotes = JSON.parse(localStorage.getItem("notes"));
    console.log(allnotes);
    console.log(addNote);
    if (addNote !== null) {
      const notesAfterdel = addNote.filter((notes) => notes.id !== listID);
      console.log("notesAfterdel", notesAfterdel);
      setAddNote(notesAfterdel);
      localStorage.setItem("Notes", JSON.stringify(notesAfterdel));
    }

    // console.log("setId-->", allnotes);
    // const notesAfterdel = allnotes.filter((notes) => notes.id !== listID);
    // console.log("notesAfterdel", notesAfterdel);
    // setAddNote(notesAfterdel);
    // localStorage.setItem("Notes", JSON.stringify(notesAfterdel));
  }

  return (
    <div className="w-100 mt-4">
      <Container>
        <div
          className="my-3"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h2 variant="h2">
            Notes
          </h2>
          <Button
            variant="primary"
            size="sm"
            onClick={handleOpen}
          >
            Add Notes
          </Button>
        </div>
        <Row container spacing={3}>
          {addNote.map((item, i) => {
            return (
              <Col xs={12} sm={6} lg={4} key={i}>
                <Card style={{ background: "#FE9B71" }}>
                  <h6
                    variant="h6"
                    className='px-3 py-2'
                  >
                    {item.title}

                    <FontAwesomeIcon onClick={() => handleDelete(item.id)} icon={faTimes} style={{ float: "right", cursor: "pointer" }} className="p-1"></FontAwesomeIcon>

                  </h6>
                  <p
                    className='px-3'
                  >
                    {item.notes}
                  </p>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      <Modal
        show={open}
        onHide={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="py-2">Title</div>
            <input
              id="outlined-basic"
              label="Title"
              variant="outlined"
              style={{ width: "100%" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p style={{ color: "red" }} className="py-1">{titleError}</p>
          </div>
          <div>
            <div sx={{ py: 2 }}>Notes</div>
            <textarea
              rows="4"
              style={{ width: "100%" }}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
            <p style={{ color: "red" }} className="py-1">{notesError}</p>
          </div>
          <Button variant="success" onClick={handleAdd}>
            Add Notes
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Notes;
