import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function ProjectEditForm({ currentProject, setProjects, setIsEditing }) {
  //useState로 title 상태를 생성함.
  const [projectTitle, setProjectTitle] = useState(currentProject.projectTitle);
  //useState로 description 상태를 생성함.
  const [projectDetail, setProjectDetail] = useState(currentProject.projectDetail);
  //useState로 fromDate 상태를 생성함.
  const [from_Date, setFrom_Date] = useState(new Date(currentProject.fromDate));
  //useState로 toDate 상태를 생성함.
  const [to_Date, setTo_Date] = useState(new Date(currentProject.toDate));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // currentProject의 user_id를 user_id 변수에 할당함.
    const id = currentProject.id;
    const fromDate = from_Date.toISOString().split("T")[0];
    const toDate = to_Date.toISOString().split("T")[0];

    // "projects/프로젝트id" 엔드포인트로 PUT 요청함.
    await Api.put(`users/${id}/project/${currentProject.pro_id}/update`, {
      id,
      projectTitle,
      projectDetail,
      fromDate,
      toDate,
    });

    // "projectlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get(`users/${id}/project`);
    
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
