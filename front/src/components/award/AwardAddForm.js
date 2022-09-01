import React, { useState } from "react";
import {Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardAddForm({ portfolioOwnerId, setAwards, setIsAdding }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = portfolioOwnerId;
    try {
      const res = await Api.post("award/add", {
        id,
        ...awardForm,
      });
      setAwards((prev) => [...prev, res.data]);
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
          <button className="edit-btn me-3" type="submit">
            확인
          </button>
          <button
            className="edit-cancel-btn"
            onClick={() => setIsAdding((prev) => !prev)}
          >
            취소
          </button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default AwardAddForm;
