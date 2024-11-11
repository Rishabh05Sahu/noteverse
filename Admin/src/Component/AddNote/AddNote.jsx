import React, { useState, useEffect } from "react";
import "../AddNote/AddNote.css";
import uploadimg from "../../assets/upload_area.svg";
import Select from "react-select";

const AddNote = () => {
  const backendUrl=`${import.meta.env.VITE_BACKEND_URL}`
  const [upload, setUpload] = useState({
    subject: "",
    semester: "",
    unit: "",
    file: null,
    type: "",
  });
  const [previewUrl, setPreviewUrl] = useState(uploadimg);
  const [subjects, setSubjects] = useState([]);

  const handleSemesterChange = async (event) => {
    const selectedSemester = event.target.value;
    setUpload((prevUpload) => ({ ...prevUpload, semester: selectedSemester }));

    if (!selectedSemester) return;

    try {
      const response = await fetch(`${backendUrl}/subject/filter/${selectedSemester}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        const formattedSubjects = data.map((subject) => ({
          value: subject,
          label: subject,
        }));
        setSubjects(formattedSubjects);
      } else {
        setSubjects([]);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const changeHandler = (e) => {
    setUpload({
      ...upload,
      [e.target.name]: e.target.value,
    });
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];
    setUpload({
      ...upload,
      file: file,
    });
    setPreviewUrl(URL.createObjectURL(file));
  };

  const subjectChangeHandler = (selectedOption) => {
    setUpload({
      ...upload,
      subject: selectedOption.value,
    });
  };

  const uploadFile = async () => {
    if (!upload.file) return "";

    const formData = new FormData();
    formData.append("upload", upload.file);

    try {
      const response = await fetch(`${backendUrl}/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        return result.url;
      } else {
        alert("Failed to upload file.");
        return "";
      }
    } catch (error) {
      console.error("File upload error:", error);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileUrl = await uploadFile();
    if (fileUrl === "") {
      alert("Please upload a valid file.");
      return;
    }

    try {
      const apiUrl = upload.type === 'note' ? `${backendUrl}/note/add` : `${backendUrl}/pyq/add`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...upload,
          url: fileUrl,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Uploaded successfully!");
        setUpload({
          subject: "",
          semester: "",
          unit: "",
          file: null,
          type: "",
        });
        setPreviewUrl(uploadimg);
        document.getElementById("file-input").value = "";
      } else {
        alert("Failed to add note.");
      }
    } catch (error) {
      console.error("Error adding note:", error);
      alert("An error occurred while adding the note.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="add-note">
        <div className="sem-detail">
          <p>Semester</p>
          <select
            value={upload.semester}
            onChange={handleSemesterChange}
            name="semester"
            id="semester"
          >
            <option value="" disabled>Select Semester</option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
          </select>
        </div>
        <div className="subName">
          <p>Subject Name</p>
          <Select
            value={
              upload.subject
                ? subjects.find((sub) => sub.value === upload.subject)
                : null
            }
            onChange={subjectChangeHandler}
            options={subjects}
            placeholder="Select a subject"
            isSearchable={true}
          />
        </div>
        <div className="sem-unit-detail">
          <div className="unit-detail">
            <p>Unit</p>
            <select
              value={upload.unit}
              onChange={changeHandler}
              name="unit"
              id="unit"
            >
              <option value="" disabled>Select Unit</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="type-detail">
            <p>Type</p>
            <select
              value={upload.type}
              onChange={changeHandler}
              name="type"
              id="type"
            >
              <option value="" disabled>Select type</option>
              <option value="pyq">PYQ</option>
              <option value="note">Note</option>
            </select>
          </div>
        </div>
        <div className="add-note-area">
          <label htmlFor="file-input">
            <img
              src={previewUrl}
              className="addnote-thumbnail-img"
              alt="Preview"
            />
          </label>
          <input
            onChange={fileHandler}
            type="file"
            name="note_file"
            id="file-input"
            hidden
          />
        </div>
        <button type="submit" className="addnote-btn">Add</button>
      </div>
    </form>
  );
};

export default AddNote;
