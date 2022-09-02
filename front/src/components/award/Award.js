import React, { useState } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

function Award({ award, setAwards, isEditable }) {
  const [isEditing, setIsEditing] = useState("");
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  return (
    <>
      {isEditing ? (
        <AwardEditForm
          currentAward={award}
          setAwards={setAwards}
          setIsEditing={toggleEdit}
        />
      ) : (
        <AwardCard
          award={award}
          isEditable={isEditable}
          setIsEditing={toggleEdit}
          setAwards={setAwards}
        />
      )}
    </>
  );
}

export default Award;
