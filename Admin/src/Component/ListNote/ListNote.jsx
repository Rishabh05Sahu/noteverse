import React, { useState, useEffect } from "react";
import "../ListNote/ListNote.css";
import cross from "../../assets/cross_icon.png";
import subjects from "../../../../Frontend/src/Pages/Subject";
import image from "../../../../Frontend/src/assets/img.png";

const ListNote = () => {
  const backendUrl=`${import.meta.env.VITE_BACKEND_URL}`
  const [notes, setNotes] = useState([]);
  const [pyqs, setPyqs] = useState([]);

  // Fetch notes from the backend when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${backendUrl}/note/all`);
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    const fetchPyqs = async () => {
      try {
        const response = await fetch(`${backendUrl}/pyq/all`);
        const data = await response.json();
        setPyqs(data);
      } catch (error) {
        console.error("Error fetching pyqs:", error);
      }
    };

    fetchNotes();
    fetchPyqs();
  }, []); 

  const deleteNote = async (_id) => {
    try {
      const response = await fetch(`${backendUrl}/note/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });

      const result = await response.json();
      if (result.success) {
        // Filter out the removed note from the state
        setNotes(notes.filter((note) => note._id !== _id));
      } else {
        alert("Failed to remove note.");
      }
    } catch (error) {
      console.error("Error removing note:", error);
    }
  };
  const deletePyq = async (_id) => {
    try {
      const response = await fetch(`${backendUrl}/pyq/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });

      const result = await response.json();
      if (result.success) {
        // Filter out the removed note from the state
        setPyqs(pyqs.filter((pyq) => pyq._id !== _id));
      } else {
        alert("Failed to remove pyq.");
      }
    } catch (error) {
      console.error("Error removing pyqs:", error);
    }
  };

  return (<div className="list-page">
    <div className="list-note">
      <h1>All Notes List</h1>
      <div className="listnote-format-main">
        <p>Note</p>
        <p>Subject Name</p>
        <p>Semester</p>
        <p>Unit</p>
        <p>Remove</p>
      </div>
      <div className="listnote-allnote">
        <hr />
        {notes.map((note) => {
          return (
            <div key={note._id}>
              {" "}
              {/* Use a wrapper div with the key */}
              <div className="listnote-format-main listnote-format">
                <img src={image} alt="" className="listnote-note-icon" />
                <p>{note.subject}</p>
                <p>{note.semester}</p>
                <p>{note.unit}</p>
                <img
                  src={cross}
                  alt=""
                  onClick={() => deleteNote(note._id)}
                  className="listnote-remove-icon"
                />
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
    <div className="list-note">
    <h1>All Pyqs List</h1>
    <div className="listnote-format-main">
      <p>Pyq</p>
      <p>Subject Name</p>
      <p>Semester</p>
      <p>Unit</p>
      <p>Remove</p>
    </div>
    <div className="listnote-allnote">
      <hr />
      {pyqs.map((pyq) => {
        return (
          <div key={pyq._id}>
            {" "}
            {/* Use a wrapper div with the key */}
            <div className="listnote-format-main listnote-format">
              <img src={image} alt="" className="listnote-note-icon" />
              <p>{pyq.subject}</p>
              <p>{pyq.semester}</p>
              <p>{pyq.unit}</p>
              <img
                src={cross}
                alt=""
                onClick={() => deletePyq(pyq._id)}
                className="listnote-remove-icon"
              />
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  </div>
  </div>
  );
};

export default ListNote;
