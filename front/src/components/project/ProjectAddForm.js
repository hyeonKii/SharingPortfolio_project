import React, { useState } from "react";
import {Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  const [projectForm, setProjectForm] = useState({
    projTitle: "",
    projDetail: "",

    fromDate: new Date(),
    toDate: new Date(),
  });

  function handleOnchange(e) {
    const { name, value } = e.target;
    setProjectForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleDateChange = (date, name) => {
    setProjectForm(prev=> ({
      ...prev,
      [name]: date,

    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = portfolioOwnerId;

    try {
      const res = await Api.post("project/add", {
        id,
        ...projectForm,
      });
      setProjects((prev) => [...prev, res.data]);
      setIsAdding((prev) => !prev);
    } catch (err) {
      console.log("등록에 실패하였습니다.", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="projectAddTitle">
        <Form.Control
          type="text"
          placeholder="프로젝트 제목"
          name="projTitle"
          value={projectForm.projTitle}
          onChange={handleOnchange}
        />
      </Form.Group>

      <Form.Group controlId="projectAddDetail" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          name="projDetail"
          value={projectForm.projDetail}
          onChange={handleOnchange}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        <Col xs="auto">
          <DatePicker
            selected={projectForm.fromDate}
            onChange={(date) => handleDateChange(date, "fromDate")}
          />
        </Col>
        <Col xs="auto">
          <DatePicker
            selected={projectForm.toDate}
            onChange={(date) => handleDateChange(date, "toDate")}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <button className="edit-btn me-3" type="submit">
            확인
          </button>
          <button
            className="edit-cancel-btn"
            onClick={() => setIsAdding((prev) => !prev)}
          >
            취소
          </button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectAddForm;
