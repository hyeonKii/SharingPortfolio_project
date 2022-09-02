import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({ edu, isEditable, setEdu }) {
  const [isEditing, setIsEditing] = useState("");
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  return (
    <>
      {!isEditing ? (
        <EducationCard
          edu={edu}
          setIsEditing={toggleEdit}
          isEditable={isEditable}
          setEdu={setEdu}
        />
      ) : (
        <EducationEditForm
          edu={edu}
          setIsEditing={toggleEdit}
          setEdu={setEdu}
        />
      )}
    </>
  );
}

export default Education;
