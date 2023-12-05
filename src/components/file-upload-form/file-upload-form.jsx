import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const FileUploadForm = ({ token, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("ProfilePic", selectedFile);

    fetch("https://chaseflix-481df0d77a4b.herokuapp.com/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Profile picture uploaded successfully!");
        onUpload(data.fileLocation);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        alert("Failed to upload profile picture.");
      });
  };

  return (
    <Form onSubmit={handleUpload}>
      <Form.Group>
        <Form.Label>Upload Profile Picture</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      <Button type="submit">Upload</Button>
    </Form>
  );
};
