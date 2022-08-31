import React, { useState } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

function Award({ award, setAwards, isEditable }) {
  const [isEditing, setIsEditing] = useState("");
  ///front code review no.2
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  /// setIsEditing={}도 수정
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
          setAwards = {setAwards}
        />
      )}
    </>
  );
}

export default Award;
