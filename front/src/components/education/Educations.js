import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import Education from "./Education";
import EducationAddForm from "./EducationAddForm";
import "../components.css"
function Educations({ portfolioOwnerId, isEditable }) {
  const [educations, setEducations] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get("edu", portfolioOwnerId).then((res) => {
      if (!Array.isArray(res.data)) {
        console.log("res.data is not array");
        return;
      }

      setEducations(res.data);
    });
  }, [portfolioOwnerId]);

  return (
    <Card className="edu-mvp">
      <Card.Body>
        <Card.Title>학력</Card.Title>
        {educations.map((education) => (
          <Education
            key={education.eduId}
            edu={education}
            isEditable={isEditable}
            setEdu={setEducations}
          />
        ))}
        {isAdding && (
          <EducationAddForm
            portfolioOwnerId={portfolioOwnerId}
            setIsAdding={setIsAdding}
            setEdu={setEducations}
          />
        )}
        {isEditable && (
          <Row className="mt-3 mb-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="outline-success" onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}

export default Educations;
