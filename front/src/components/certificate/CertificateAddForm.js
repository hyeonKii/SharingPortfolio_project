import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";


function CertifiAddForm({ portfolioOwnerId, setIsAdding, setCertificates }) {
  const [certiTitle, setCertiTitle] = useState("");
  const [certiDetail, setCertiDetail] = useState("");
  const [certi_Date,setCerti_Date] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id=portfolioOwnerId;
    const certiDate=certi_Date.toISOString().split("T")[0];
    try {
      await Api.post("certi/add", {
        id,
        certiTitle,
        certiDetail,
        certiDate,
      });
    } catch (err) {
      console.log("등록에 실패하였습니다.", err);
    }
    
    const res = await Api.get("certi");
    setCertificates(res.data);
    setIsAdding(false);
  };

  return (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="certifiAddTitle">
            <Form.Control
              type="text"
              placeholder="자격증 이름"
              value={certiTitle}
              onChange={(e) => setCertiTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="certifiAddDetail" className="mt-3">
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

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsAdding(false)}>
                취소
              </Button>
              </Col>
              
          </Form.Group>
        </Form>

  );
}

export default CertifiAddForm;
