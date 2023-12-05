import React from "react";
import Button from "react-bootstrap/Button";

const UnfollowUser = ({ userId, userToUnfollowId, token, onFollowChange }) => {
  const handleUnfollow = () => {
    fetch(
      `https://chaseflix-481df0d77a4b.herokuapp.com/users/${userId}/follow/${userToUnfollowId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Unfollowed successfully");
          onFollowChange();
        } else {
          alert("Failed to unfollow");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Button variant="secondary" onClick={handleUnfollow}>
      Unfollow
    </Button>
  );
};

export default UnfollowUser;
