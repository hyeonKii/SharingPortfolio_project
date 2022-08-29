import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ currentAward, setAwards, setIsEditing }) {
  // const [awardTitle, setAwardTitle] = useState(currentAward.awardTitle);
  // const [awardDetail, setAwardDetail] = useState(currentAward.awardDetail);
  const [awardForm, setAwardForm] = useState({
    awardTitle: currentAward.awardTitle,
    awardDetail: currentAward.awardDetail,
  });
  function handleOnchange(e) {
    const { name, value } = e.target;
    setAwardForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = currentAward.id;
    try {
      await Api.put(`award/${currentAward.awardId}`, {
        id,
        ...awardForm,
      });
    } catch (error) {
      console.log("award편집에 실패하였습니다.", error);
    }
    const res = await Api.get("award");
    if (!Array.isArray(res.data)) {
      console.log("res.data is not array");
      return;
    }
    setAwards(res.data);
    setIsEditing((prev) => !prev);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="awardEditTitle">
        <Form.Control
          type="text"
          placeholder="수상내역"
          name="awardTitle"
          value={awardForm.awardTitle}
          onChange={handleOnchange}
        />
      </Form.Group>

      <Form.Group controlId="awardEditDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          name="awardDetail"
          value={awardForm.awardDetail}
          onChange={handleOnchange}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
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

export default AwardEditForm;
