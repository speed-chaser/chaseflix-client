import React, { useState } from "react";

export const FileUploadForm = ({ user, token }) => {
  const [message, setMessage] = useState("");

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.ProfilePic.files[0];

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setMessage("File size exceeds the maximum limit (5MB).");
      return;
    }
    const formData = new FormData(e.target);

    try {
      const response = await fetch(
        "https://chaseflix-481df0d77a4b.herokuapp.com/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      console.log("Response: ", response);

      if (response.ok) {
        const data = await response.text();

        const newProfilePic = data.link;

        const updateUserResponse = await fetch(
          `https://chaseflix-481df0d77a4b.herokuapp.com/users/${user.Username}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ProfilePic: newProfilePic }),
          }
        );
        if (updateUserResponse.ok) {
          setMessage("File uploaded and user profile updated successfully.");
        } else {
          setMessage("An error has occurred while updating user profile.");
        }
      } else {
        setMessage("An error has occurred during file upload.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("An error has occurred during file upload.");
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <form onSubmit={handleUpload} encType="multipart/form-data">
        <input type="file" name="ProfilePic" accept="image/*" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};
