import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardAddForm({ portfolioOwnerId, setAwards, setIsAdding }) {
  //useState로 title 상태를 생성함.
  const [awardTitle, setAwardTitle] = useState("");
  //useState로 description 상태를 생성함.
  const [awardDetail, setAwardDetail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const id = portfolioOwnerId;

    // "award/create" 엔드포인트로 post요청함.
    try {
    await Api.post(`users/${id}/award/add`, {
      id,
      awardTitle,
      awardDetail,
    });
    } catch (err) {
        console.log("등록에 실패하였습니다.", err);
    }

    // "awardlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get(`users/${id}/award`);
    // awards를 response의 data로 세팅함.
    setAwards(res.data);
    // award를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="awardAddTitle">
        <Form.Control
          type="text"
          placeholder="수상내역"
          value={awardTitle}
          onChange={(e) => setAwardTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="awardAddDetail" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={awardDetail}
          onChange={(e) => setAwardDetail(e.target.value)}
        />
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

export default AwardAddForm;
