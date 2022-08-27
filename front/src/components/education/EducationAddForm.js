import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
//get:조회 post:등록 put:수정
function EducationAddForm({ portfolioOwnerId, setIsAdding, setEdu }) {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [degree, setDegree] = useState("재학중");

  const handleSubmit = async (e) => {
    // preventDefault 해주기
    e.preventDefault();
    const id=portfolioOwnerId;  //로그인된 사용자 id
    try {
      await Api.post("edu/add", {
        id,
        school,
        major,
        degree,
       
      });
    } catch (err) {
      console.log("등록에 실패하였습니다.", err);
    }
    
    const res = await Api.get("edu");
    setEdu(res.data);
    setIsAdding(false);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="useAddSchool" className="mb-3">
        <Form.Control
          type="text"
          placeholder="학교"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="useAddMajor" className="mb-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="RadioFromUseAddDegree">
        <div key={`inline-radio`} className="mb-3 mt-3">
          <Form.Check
            inline
            label="재학중"
            id="radio1"
            type="radio"
            name="position"
            value="재학중"
            checked={degree === "재학중"}
            onChange={(e) => setDegree(e.target.value)}
          />
          <Form.Check
            inline
            label="학사졸업"
            id="radio2"
            type="radio"
            name="position"
            value="학사졸업"
            checked={degree === "학사졸업"}
            onChange={(e) => setDegree(e.target.value)}
          />
          <Form.Check
            inline
            label="석사졸업"
            id="radio3"
            type="radio"
            name="position"
            value="석사졸업"
            checked={degree === "석사졸업"}
            onChange={(e) => setDegree(e.target.value)}
          />
          <Form.Check
            inline
            label="박사졸업"
            id="radio4"
            type="radio"
            name="position"
            value="박사졸업"
            checked={degree === "박사졸업"}
            onChange={(e) => setDegree(e.target.value)}
          />
        </div>
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

export default EducationAddForm;
