import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null); // State for editing
  const studentsCollection = collection(db, "students");

  // Fetch students from Firestore
  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getDocs(studentsCollection);
      setStudentList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchStudents();
  }, []);

  // Add new student
  const onFormSubmit = async (event) => {
    event.preventDefault();

    // Validation
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

    try {
      const docRef = await addDoc(studentsCollection, formData);
      console.log("Document written with ID: ", docRef.id);

      // Update local state
      setStudentList([...studentList, { ...formData, id: docRef.id }]);

      // Reset form
      setFormData({
        userName: "",
        gender: "",
        stdClass: "",
        tnum: "",
        age: "",
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit. Please check your Firestore configuration.");
    }
  };

  // Delete a student
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      setStudentList(studentList.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student: ", error);
    }
  };

  // Update student
  const handleUpdate = async () => {
    if (!editingStudent) return;

    const studentDoc = doc(db, "students", editingStudent.id);
    try {
      await updateDoc(studentDoc, {
        userName: editingStudent.userName,
        gender: editingStudent.gender,
        stdClass: editingStudent.stdClass,
        tnum: editingStudent.tnum,
        age: editingStudent.age,
      });

      setStudentList((prevList) =>
        prevList.map((student) =>
          student.id === editingStudent.id ? editingStudent : student
        )
      );
      setEditingStudent(null);
    } catch (error) {
      console.error("Error updating student: ", error);
      alert("Failed to update student. Please try again.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditingStudent({ ...editingStudent, [name]: value });
  };

  return (
    <div style={{ backgroundColor: "rgb(178, 239, 241)" }}>
      <center>
        <h1 style={{ 
          margin: 0, 
          // marginBlock: "20px" 
          }}>
          Student Management System
        </h1>
      </center>

      {/* Add Student Form */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!editingStudent && !isSubmitted ? (
          <form
            onSubmit={onFormSubmit}
            autoComplete="off"
            style={{
              display: "flex",
              alignSelf: "center",
              flexDirection: "column",
              backgroundColor: "white",
              paddingBlock: "10px",
              paddingInline: "10px",
              borderRadius: "10px",
              width: "60%",
            }}
          >
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
              <div style={{ display: "flex", flexDirection: "row" }}>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleInputChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleInputChange}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={formData.gender === "Other"}
                    onChange={handleInputChange}
                  />
                  Other
                </label>
              </div>
            </div>
            <div>
              <label>Student Class</label>
              <input
                type="text"
                name="stdClass"
                value={formData.stdClass}
                onChange={handleInputChange}
                placeholder="Enter the Class"
              />
            </div>
            <div>
              <label>Contact Number </label>
              <input
                type="number"
                name="tnum"
                value={formData.tnum}
                onChange={handleInputChange}
                placeholder="Enter your Phone Number"
              />
            </div>
            <div>
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Enter your Age"
              />
            </div>
            <div className="form-action-buttons">
              <input type="submit" value="Submit" />
            </div>
          </form>
        ) : editingStudent ? (
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              paddingBlock: "10px",
              paddingInline: "10px",
              // marginInline: "150px",
              borderRadius: "10px",
              width: "60%",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <h3>Update Student</h3>
            <div>
              <label>Full Name</label>
              <input
                type="text"
                name="userName"
                value={editingStudent.userName}
                onChange={handleEditInputChange}
                placeholder="Enter the user Name"
              />
            </div>
            <div>
              <label>Gender</label>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={editingStudent.gender === "Male"}
                    onChange={handleEditInputChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={editingStudent.gender === "Female"}
                    onChange={handleEditInputChange}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={editingStudent.gender === "Other"}
                    onChange={handleEditInputChange}
                  />
                  Other
                </label>
              </div>
            </div>

            <div>
              <label>Student Class</label>
              <input
                type="text"
                name="stdClass"
                value={editingStudent.stdClass}
                onChange={handleEditInputChange}
                placeholder="Enter the Class"
              />
            </div>
            <div>
              <label>Contact Number </label>
              <input
                type="number"
                name="tnum"
                value={editingStudent.tnum}
                onChange={handleEditInputChange}
                placeholder="Enter your Phone Number"
              />
            </div>
            <div>
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={editingStudent.age}
                onChange={handleEditInputChange}
                placeholder="Enter your Age"
              />
            </div>
            <div
              className="form-action-buttons"
              style={{ display: "flex", gap: "10px" }}
            >
              <input type="submit" value="Save Changes" />
              <input
                type="submit"
                value="Cancel"
                onClick={() => setEditingStudent(null)}
              />
            </div>
          </form>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
              padding: "20px",
              margin: "20px auto",
              maxWidth: "500px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p>Form submitted successfully!</p>
            <button
              onClick={() => setIsSubmitted(false)}
              style={{
                backgroundColor: "#28a745",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Add More Details
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          backgroundColor: "lightPink",
          paddingBlock: "20px",
          marginBottom: "20px",
        }}
        className="image"
      >
        <center>
          <img src={photo1} alt="Student" />
        </center>
      </div>

      {/* Student List */}
      <table className="list" style={{ backgroundColor: "white" }}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Class</th>
            <th>Contact Number</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student) => (
            <tr key={student.id}>
              <td>{student.userName}</td>
              <td>{student.gender}</td>
              <td>{student.stdClass}</td>
              <td>{student.tnum}</td>
              <td>{student.age}</td>
              <td style={{display:'flex', gap:'5px'}}>
                <input type="submit" value="Update" onClick={() => setEditingStudent(student)}/>
                <input type="submit" value="Delete" onClick={() => handleDelete(student.id)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
