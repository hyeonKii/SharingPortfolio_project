import React, { useState } from "react";
import {Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function ProjectEditForm({ currentProject, setProjects, setIsEditing }) {
  const [projectForm, setProjectForm] = useState({
    projId: currentProject.projId,
    projTitle: currentProject.projTitle,
    projDetail: currentProject.projDetail,
    fromDate: new Date(currentProject.fromDate),
    toDate: new Date(currentProject.toDate),
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

    const id = currentProject.id;

    try {
      await Api.put(`project/${currentProject.projId}`, {
        id,
        ...projectForm,
      });
      const project = {
        id: id,
        projId: projectForm.projId,
        projTitle: projectForm.projTitle,
        projDetail: projectForm.projDetail,
        fromDate: projectForm.fromDate.toISOString().split("T")[0],
        toDate: projectForm.toDate.toISOString().split("T")[0],
      };
      setProjects((prev) => {
        return prev.map((el) => {
          if (el.projId === project.projId) return project;
          else return el;
        });
      });
      setIsEditing((prev) => !prev);
    } catch (err) {
      console.log("project 편집에 실패하였습니다.", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="projectEditTitle">
        <Form.Control
          type="text"
          placeholder="프로젝트 제목"
          name="projTitle"
          value={projectForm.projTitle}
          onChange={handleOnchange}
        />
      </Form.Group>

      <Form.Group controlId="projectEditDescription" className="mt-3">
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

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <button className="edit-btn me-3" type="submit">
            확인
          </button>
          <button
            className="edit-cancel-btn"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            취소
          </button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectEditForm;
