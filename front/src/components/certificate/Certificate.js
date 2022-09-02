import React, { useState } from "react";
import CertifiCard from "./CertificateCard";
import CertifiEditForm from "./CertificateEditForm";

function Certificate({ certificate, setCertificates, isEditable }) {
  const [isEditing, setIsEditing] = useState("");
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
          setCertificates={setCertificates}
          isEditable={isEditable}
          setIsEditing={toggleEdit}
        />
      )}
    </>
  );
}

export default Certificate;
