import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";

function Project({ project, setProjects, isEditable }) {
  const [isEditing, setIsEditing] = useState("");

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
