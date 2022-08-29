import { Card, Button, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import CertifiAddForm from "./CertificateAddForm";
import Certificate from "./Certificate";
import * as Api from "../../api";

function Certificates({ portfolioOwnerId, isEditable }) {
  const [isAdding, setIsAdding] = useState(false)
  const [certificates, setCertificates] = useState([])


  useEffect(() => {
    // "`users/${portfolioOwnerId}/certificate`"로 GET
    Api.get("certi",portfolioOwnerId).then((res) => setCertificates(res.data));
  }, [portfolioOwnerId]);

  return (
    <>
    <Card>
      <Card.Body>
      <Card.Title>자격증</Card.Title>
          {certificates.map((certificate)=>(
            <Certificate
            key={certificate.certiId}
            certificate={certificate}
            setCertificates={setCertificates}
            isEditable={isEditable}
            />
          ))}

        
      {isAdding && (
        <CertifiAddForm
          portfolioOwnerId={portfolioOwnerId}
          setIsAdding={setIsAdding}
          setCertificates={setCertificates}
        />
      )} 
      {isEditable&&(
        <Row className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button onClick={() => setIsAdding(true)}>+</Button>
        </Col>
      </Row>
      )}
      </Card.Body>
    </Card>
    </>
  );
}

export default Certificates;
