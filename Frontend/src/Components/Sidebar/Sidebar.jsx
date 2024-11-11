import React, { useContext, useState } from 'react';
import "../Sidebar/Sidebar.css";
import { AppContext } from '../../Context/AppContext';

const Sidebar = () => {
  const backendUrl=`${import.meta.env.VITE_BACKEND_URL}`
  const { setSemester, setSubject, semester, subject, subjects, setSubjects } = useContext(AppContext);

  const handleSubjectChange = async (event) => {
    const selectedSubject = event.target.value;
    setSubject(selectedSubject);
  }

  // Handle semester change to fetch subjects based on the selected semester
  const handleSemesterChange = async (event) => {
    const selectedSemester = event.target.value;
    setSemester(selectedSemester);

    if (!selectedSemester) return; // Exit if no semester is selected

    try {
      // Fetch subjects for the selected semester
      const response = await fetch(`${backendUrl}/subject/filter/${selectedSemester}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setSubjects(data); // Update subjects state if the data is an array

      } else {
        setSubjects([]); // Reset if no subjects found
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const subject = event.target.subject.value;
  //   setSubject(subject);
  // };

  return (
    <div className='sidebar'>
      <form >
        <select value={semester} name="semester" onChange={handleSemesterChange}>
          <option value="">Select Semester</option>
          <option value="1">1st sem</option>
          <option value="2">2nd sem</option>
          <option value="3">3rd sem</option>
          <option value="4">4th sem</option>
        </select>

        <select value={subject} name="subject" onChange={handleSubjectChange}>

          {subjects.length > 0 ? (
            subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))
          ) : (
            <option value="" >No subjects available</option>
          )}
        </select>

        {/* <input type="submit" value="Submit" /> */}
      </form>
    </div>
  );
};

export default Sidebar;
