import React, { useEffect, useContext, useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Card from '../Components/Card/Card';
import { AppContext } from '../Context/AppContext';
import "./CSS/Pyq.css";
import img from "../assets/errorimg.gif";
import search from "../assets/search.gif";

const Pyq = () => {
  const backendUrl=`${import.meta.env.VITE_BACKEND_URL}`
  const { semester, subject } = useContext(AppContext);
  const [pyqs, setPyqs] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    const fetchPyqs = async () => {
      if (semester && subject) {
        setLoading(true); // Start loading
        try {
          const url = `${backendUrl}/pyq/filter/${semester}/${subject}`;
          console.log('Fetching from:', url);
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setPyqs(data);
        } catch (error) {
          console.error('Error fetching pyqs:', error);
        } finally {
          setLoading(false); // End loading
        }
      } else {
        setPyqs([]); // Clear pyqs when no semester or subject is selected
      }
    };

    fetchPyqs();
  }, [semester, subject]);

  return (
    <div>
      <Sidebar />
      <div className="card-list">
        {loading ? (
          <p>Loading previous year questions...</p>
        ) : (
          <>
            {!semester || !subject ? (
              <div className="start-search">
                <p>Please select a semester and subject to start searching for Pyqs.</p>
                <img src={search} alt="Search Prompt" />
              </div>
            ) : pyqs.length > 0 ? (
              pyqs.map((item) => (
                <Card key={item._id} title={item.subject} unit={item.unit} url={item.url} />
              ))
            ) : (
              <div className="not-available">
                <p>No pyq available for this subject and semester.</p>
                <img src={img} alt="No pyqs available" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Pyq;
