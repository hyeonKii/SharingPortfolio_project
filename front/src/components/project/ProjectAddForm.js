import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDetail, setProjectDetail] = useState("");
  const [from_Date, setFrom_Date] = useState(new Date());
  const [to_Date, setTo_Date] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = portfolioOwnerId;
    const fromDate = from_Date.toISOString().split("T")[0];
    const toDate = to_Date.toISOString().split("T")[0];

    try {
    await Api.post("project/add", {
      id,
      projectTitle,
      projectDetail,
      fromDate,
      toDate,
    });
    } catch(err) {
      console.log("등록에 실패하였습니다.", err)
    }

   
    const res = await Api.get("project");
    
    setProjects(res.data);
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="projectAddTitle">
        <Form.Control
          type="text"
          placeholder="프로젝트 제목"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="projectAddDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={projectDetail}
          onChange={(e) => setProjectDetail(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        <Col xs="auto">
          <DatePicker
            selected={from_Date}
            onChange={(date) => setFrom_Date(date)}
          />
        </Col>
        <Col xs="auto">
          <DatePicker selected={to_Date} onChange={(date) => setTo_Date(date)} />
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

export default ProjectAddForm;
