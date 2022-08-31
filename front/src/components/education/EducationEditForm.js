import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationEditForm({ edu, setIsEditing, setEdu }) {
  // const [school, setSchool] = useState(edu.school);
  // const [major, setMajor] = useState(edu.major);
  // const [degree, setDegree] = useState(edu.degree);
  const [educationForm, setEducationForm] = useState({
    eduId: edu.eduId,
    school: edu.school,
    major: edu.major,
    degree: edu.degree,
  });
  function handleOnchange(e) {
    const { name, value } = e.target;
    setEducationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleSubmit = async (e) => {
    // preventDefault 해주기
    e.preventDefault();

    const id = edu.id; //id는 사용자 id
    try {
      await Api.put(`edu/${edu.eduId}`, {
        ///users/:id/edu/:edu_id/update
        id,
        ...educationForm,
      });
      const education={
        id:id,
        eduId: educationForm.eduId,
        school : educationForm.school,
        major : educationForm.major,
        degree : educationForm.degree
      }
      setEdu((prev) => {
        return prev.map(el => {
          if(el.eduId === education.eduId) return education 
          else return el
        })
      });
      setIsEditing((prev) => !prev);
    } catch (err) {
      console.log("education편집에 실패하였습니다.", err);
    }
    // edu 정보는 response의 data임.
  //   const res = await Api.get("edu",id);

  //   // 해당 edu 정보로 edu을 세팅함.
  //   if (!Array.isArray(res.data)) {
  //     console.log("res.data is not array");
  //     return;
  //   }
  //   setEdu(res.data);
  //   // isEditing을 false로 세팅함.
  //   setIsEditing((prev) => !prev);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="useEditSchool" className="mb-3">
        <Form.Control
          type="text"
          placeholder="학교"
          name="school"
          value={educationForm.school}
          onChange={handleOnchange}
        />
      </Form.Group>
      <Form.Group controlId="useEditMajor" className="mb-3">
        <Form.Control
          type="text"
          placeholder="전공"
          name="major"
          value={educationForm.major}
          onChange={handleOnchange}
        />
      </Form.Group>
      <Form.Group controlId="RadioFromDegree">
        <div key={`inline-radio`} className="mb-3 mt-3">
          <Form.Check
            inline
            label="재학중"
            id="radio1"
            type="radio"
            name="degree"
            value="재학중"
            checked={educationForm.degree === "재학중"}
            onChange={handleOnchange}
          />
          <Form.Check
            inline
            label="학사졸업"
            id="radio2"
            type="radio"
            name="degree"
            value="학사졸업"
            checked={educationForm.degree === "학사졸업"}
            onChange={handleOnchange}
          />
          <Form.Check
            inline
            label="석사졸업"
            id="radio3"
            type="radio"
            name="degree"
            value="석사졸업"
            checked={educationForm.degree === "석사졸업"}
            onChange={handleOnchange}
          />
          <Form.Check
            inline
            label="박사졸업"
            id="radio4"
            type="radio"
            name="degree"
            value="박사졸업"
            checked={educationForm.degree === "박사졸업"}
            onChange={handleOnchange}
          />
        </div>
      </Form.Group>
      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationEditForm;
