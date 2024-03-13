import React, { useState } from "react";
import "./App.css";
import photo1 from "./images/photo1.jpg";

const App = () => {
  const [formData, setFormData] = useState({
    userName: "",
    gender: "",
    stdClass: "",
    tnum: "",
    age: "",
  });

  const [studentList, setStudentList] = useState([]);

  const handleUpdate = (index) => {
    const selectedStudent = studentList[index];
    setFormData(selectedStudent);

    const updatedList = studentList.filter((_, i) => i !== index);

    setStudentList(updatedList);
  };

  const handleDelete = (index) => {
    const updatedList = [...studentList];
    updatedList.splice(index, 1);
    setStudentList(updatedList);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    // Validate form data
    if (
      !formData.userName ||
      !formData.gender ||
      !formData.stdClass ||
      !formData.tnum ||
      !formData.age
    ) {
      alert("All fields are required");
      return;
    }

    // Add form data to student list
    setStudentList([...studentList, formData]);

    // Clear form data
    setFormData({
      userName: "",
      rollNo: "",
      stdClass: "",
      tnum: "",
      age: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div style={{ backgroundColor: "rgb(178, 239, 241)" }}>
      <center>
        <h1>Student Management System</h1>
      </center>
      <table>
        <tr>
          <td>
            <form onSubmit={onFormSubmit} autoComplete="off">
              <h2>SCIENCE SCHOOL</h2>
              <h3>Student Form</h3>
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  placeholder="Enter the user Name"
                />
              </div>
              <div>
                <label>Gender</label>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  placeholder="Enter the Enrollment Number"
                />
              </div>
              <div>
                <label>Student Class</label>
                <input
                  type="text"
                  name="stdClass"
                  value={formData.stdClass}
                  onChange={handleInputChange}
                  placeholder="Enter the user Name"
                />
              </div>
              <div>
                <label>Telephone Number </label>
                <input
                  type="text"
                  name="tnum"
                  value={formData.tnum}
                  onChange={handleInputChange}
                  placeholder="Enter the user Name"
                />
              </div>
              <div>
                <label>Age</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Enter the user Name"
                />
              </div>
              {/* Repeat for other form fields */}
              <div class="form-action-buttons">
                <input type="submit" value="Submit" />
              </div>
            </form>
          </td>
          <td>
            <table className="image">
              <center>
                <img src={photo1} alt="Student" />
              </center>
            </table>
          </td>
        </tr>
      </table>

      <table className="list" style={{ backgroundColor: "white" }}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Class</th>
            <th>Telephone Number</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student, index) => (
            <tr key={index}>
              <td>{student.userName}</td>
              <td>{student.gender}</td>
              <td>{student.stdClass}</td>
              <td>{student.tnum}</td>
              <td>{student.age}</td>
              <td>
                <button onClick={() => handleUpdate(index)}>Update</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
