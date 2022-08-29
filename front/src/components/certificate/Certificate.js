import React, { useState } from "react";
import CertifiCard from "./CertificateCard";
import CertifiEditForm from "./CertificateEditForm";


function Certificate({ certificate, setCertificates, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  //front code review no.2
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <>
      {isEditing ? (
        <CertifiEditForm
        currentcertificate={certificate}
          setCertificates={setCertificates}
          setIsEditing={toggleEdit}
        />
      ) : (
        <CertifiCard
          certificate={certificate}
          isEditable={isEditable}
          setIsEditing={toggleEdit}
        />
      )}
    </>
  );
}

export default Certificate;
