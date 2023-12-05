import React from "react";
import Button from "react-bootstrap/Button";

const FollowUser = ({ userId, userToFollowId, token, onFollowChange }) => {
  const handleFollow = () => {
    fetch(
      `https://chaseflix-481df0d77a4b.herokuapp.com/users/${userId}/follow/${userToFollowId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Followed successfully");
          onFollowChange();
        } else {
          alert("Failed to follow");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Button variant="primary" onClick={handleFollow}>
      Follow
    </Button>
  );
};

export default FollowUser;
