import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";

function Project({ project, setProjects, isEditable }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState("");
   ///front code review no.2
   const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          currentProject={project}
          setProjects={setProjects}
          setIsEditing={toggleEdit}
        />
      ) : (
        <ProjectCard
          project={project}
          setProjects={setProjects}
          isEditable={isEditable}
          setIsEditing={toggleEdit}
        />
      )}
    </>
  );
}

export default Project;
