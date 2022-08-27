import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardAddForm({ portfolioOwnerId, setAwards, setIsAdding }) {
 
  const [awardTitle, setAwardTitle] = useState("");
  const [awardDetail, setAwardDetail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const id = portfolioOwnerId;

    
    try {
    await Api.post("award/add", {
      id,
      awardTitle,
      awardDetail,
    });
    } catch (err) {
        console.log("등록에 실패하였습니다.", err);
    }

    
    const res = await Api.get("award");
    
    setAwards(res.data);
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
