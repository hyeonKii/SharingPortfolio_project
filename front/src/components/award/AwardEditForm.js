import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ currentAward, setAwards, setIsEditing }) {
  //useState로 title 상태를 생성함.
  const [awardTitle, setAwardTitle] = useState(currentAward.awardTitle);
  //useState로 description 상태를 생성함.
  const [awardDetail, setAwardDetail] = useState(currentAward.awardDetail);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // currentAward의 user_id를 user_id 변수에 할당함.
    const id = currentAward.id;

    // "awards/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`users/${id}/award/${currentAward.award_id}/update`, {
      id,
      awardTitle,
      awardDetail,
    });

    // "awardlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get(`users/${id}/award`);
    
    setAwards(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="awardEditTitle">
        <Form.Control
          type="text"
          placeholder="수상내역"
          value={awardTitle}
          onChange={(e) => setAwardTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="awardEditDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={awardDetail}
          onChange={(e) => setAwardDetail(e.target.value)}
        />
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

export default AwardEditForm;
