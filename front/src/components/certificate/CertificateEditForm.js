import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CertiEditForm({ currentcertificate, setIsEditing, setCertificates }) {
  const [certiTitle, setCertiTitle] = useState(currentcertificate.certiTitle);
  const [certiDetail, setCertiDetail] = useState(currentcertificate.certiDetail);
  const [certi_Date,setCerti_Date] = useState(new Date(currentcertificate.certiDate));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = currentcertificate.id;
    const certiDate=certi_Date.toISOString().split("T")[0];
    await Api.put(`certi/${currentcertificate.certi_id}/update`, {
      id,
      certiTitle,
      certiDetail,
      certiDate,
    });
    
    const res = await Api.get("certi");
    setCertificates(res.data);
    setIsEditing(false);
  };

  return (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="certificateEditTitle" className="mb-3">
            <Form.Control
              type="text"
              placeholder="자격증 이름"
              value={certiTitle}
              onChange={(e) => setCertiTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="certificateEditDetail" className="mb-3">
            <Form.Control
              type="detail"
              placeholder="세부사항"
              value={certiDetail}
              onChange={(e) => setCertiDetail(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3">
          <Col xs="auto">
            <DatePicker
            selected={certi_Date} 
            onChange={(date) => setCerti_Date(date)}
          />
          </Col>
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
              </Col>
              
          </Form.Group>
        </Form>
  );
}

export default CertiEditForm;
