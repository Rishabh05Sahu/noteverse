import React, { useEffect, useContext, useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Card from '../Components/Card/Card';
import { AppContext } from '../Context/AppContext';
import "./CSS/Note.css";
import img from "../assets/errorimg.gif";
import search from "../assets/search.gif";

const Note = () => {
  const backendUrl=`${import.meta.env.VITE_BACKEND_URL}`
  const { semester, subject } = useContext(AppContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    const fetchNotes = async () => {
      if (semester && subject) {
        setLoading(true); // Start loading
        try {
          const url = `${backendUrl}/note/filter/${semester}/${subject}`;
          console.log('Fetching from:', url);
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setNotes(data);
        } catch (error) {
          console.error('Error fetching notes:', error);
        } finally {
          setLoading(false); // End loading
        }
      } else {
        setNotes([]); // Clear notes when no semester or subject is selected
      }
    };

    fetchNotes();
  }, [semester, subject]);

  return (
    <div>
      <Sidebar />
      <div className="card-list">
        {loading ? (
          <p>Loading notes...</p>
        ) : (
          <>
            {!semester || !subject ? (
              <div className="start-search">
                <p>Please select a semester and subject to start searching for notes.</p>
                <img src={search} alt="" />
              </div>
            ) : notes.length > 0 ? (
              notes.map((item) => (
                <Card key={item._id} title={item.subject} unit={item.unit} url={item.url} />
              ))
            ) : (
              <div className="not-available">
                <p>No notes available for this subject and semester.</p>
                <img src={img} alt="No notes available" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Note;
