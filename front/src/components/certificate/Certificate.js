import React, { useState } from "react";
import CertifiCard from "./CertificateCard";
import CertifiEditForm from "./CertificateEditForm";


function Certificate({ certificate, setCertificates, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <CertifiEditForm
        currentcertificate={certificate}
          setCertificates={setCertificates}
          setIsEditing={setIsEditing}
        />
      ) : (
        <CertifiCard
          certificate={certificate}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Certificate;
