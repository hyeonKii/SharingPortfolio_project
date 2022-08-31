import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  //1번 수정
  const [projectForm, setProjectForm] = useState({
    projTitle: "",
    projDetail: "",
    //date 수정
    fromDate: new Date(),
    toDate: new Date(),
  });
  
  // const [from_Date, setFrom_Date] = useState(new Date());
  // const [to_Date, setTo_Date] = useState(new Date());

  function handleOnchange(e){
    const {name,value} = e.target;
    setProjectForm(prev=>({
     ...prev,
     [name]:value,
    }));
 }
   
  const handleDataChange1 = (date) => {
    setProjectForm(prev=> ({
      ...prev,
      fromDate: date,
    }))
  }

  const handleDataChange2 = (date) => {
    setProjectForm(prev=> ({
      ...prev,
      toDate: date,
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
    setProjects((prev)=>[...prev, res.data]);
    setIsAdding((prev)=>!prev)
    } catch(err) {
      console.log("등록에 실패하였습니다.", err)
    }

   
    // const res = await Api.get("project");
    // if (!Array.isArray(res.data)) {
    //   console.log("res.data is not array");
    //   return;
    // }
    // setProjects(res.data);
    // setIsAdding((prev) => !prev);
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
            onChange={handleDataChange1}
          />
        </Col>
        <Col xs="auto">
          <DatePicker 
          selected={projectForm.toDate} 
          onChange={handleDataChange2} 
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding((prev) => !prev)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectAddForm;
