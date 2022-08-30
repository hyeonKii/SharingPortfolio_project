import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
//get:조회 post:등록 put:수정
function EducationAddForm({ portfolioOwnerId, setIsAdding, setEdu }) {
  // const [school, setSchool] = useState("");
  // const [major, setMajor] = useState("");
  // const [degree, setDegree] = useState("재학중");

  const [educationForm, setEducationForm] = useState({
    school: "",
    major: "",
    degree: "재학중",
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
    const id = portfolioOwnerId; //로그인된 사용자 id
    try {
      const res=await Api.post("edu/add", {
        id,
        ...educationForm,
      });
      ///수정필요
      setEdu((prev)=>[...prev,res.data]);
      setIsAdding((prev) => !prev);
      ///
    } catch (err) {
      console.log("등록에 실패하였습니다.", err);
    }

    // const res = await Api.get("edu",id);
    // if (!Array.isArray(res.data)) {
    //   console.log("res.data is not array");
    //   return;
    // }
    // setEdu(res.data);
    
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="useAddSchool" className="mb-3">
        <Form.Control
          type="text"
          placeholder="학교"
          name="school"
          value={educationForm.school}
          onChange={handleOnchange}
        />
      </Form.Group>
      <Form.Group controlId="useAddMajor" className="mb-3">
        <Form.Control
          type="text"
          placeholder="전공"
          name="major"
          value={educationForm.major}
          onChange={handleOnchange}
        />
      </Form.Group>
      <Form.Group controlId="RadioFromUseAddDegree">
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
            onClick={() => setIsAdding((prev) => !prev)}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationAddForm;
