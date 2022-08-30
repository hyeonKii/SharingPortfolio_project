import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardAddForm({ portfolioOwnerId, setAwards, setIsAdding }) {
  // const [awardTitle, setAwardTitle] = useState("");
  // const [awardDetail, setAwardDetail] = useState("");
  //////1번 리뷰 수정
  const [awardForm, setAwardForm] = useState({
    awardTitle: "",
    awardDetail: "",
  });
  function handleOnchange(e) {
    const { name, value } = e.target;
    setAwardForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  //////1번 리뷰 수정 - 아래 form.control코드 name, value 수정해야됨.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = portfolioOwnerId;
    try {
      const res =await Api.post("award/add", {
        id,
        ...awardForm,
      });
      setAwards((prev)=>[...prev,res.data]);
      setIsAdding((prev) => !prev);
    } catch (err) {
      console.log("등록에 실패하였습니다.", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="awardAddTitle">
        <Form.Control
          type="text"
          placeholder="수상내역"
          name="awardTitle"
          value={awardForm.awardTitle}
          onChange={handleOnchange}
        />
      </Form.Group>

      <Form.Group controlId="awardAddDetail" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          name="awardDetail"
          value={awardForm.awardDetail}
          onChange={handleOnchange}
        />
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

export default AwardAddForm;
