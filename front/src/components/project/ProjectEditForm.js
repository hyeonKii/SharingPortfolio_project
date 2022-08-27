import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function ProjectEditForm({ currentProject, setProjects, setIsEditing }) {
  
  const [projectTitle, setProjectTitle] = useState(currentProject.projectTitle);
  const [projectDetail, setProjectDetail] = useState(currentProject.projectDetail);
  const [from_Date, setFrom_Date] = useState(new Date(currentProject.fromDate));
  const [to_Date, setTo_Date] = useState(new Date(currentProject.toDate));

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const id = currentProject.id;
    const fromDate = from_Date.toISOString().split("T")[0];
    const toDate = to_Date.toISOString().split("T")[0];

    
    await Api.put(`project/${currentProject.pro_id}/update`, {
      id,
      projectTitle,
      projectDetail,
      fromDate,
      toDate,
    });

    
    const res = await Api.get("project");
    
    setProjects(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="projectEditTitle">
        <Form.Control
          type="text"
          placeholder="프로젝트 제목"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="projectEditDescription" className="mt-3">
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

export default ProjectEditForm;
