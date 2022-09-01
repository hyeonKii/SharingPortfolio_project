import React, { useState } from "react";
import {Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ currentAward, setAwards, setIsEditing }) {
  const [awardForm, setAwardForm] = useState({
    awardId: currentAward.awardId,
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
      const award = {
        id: id,
        awardId: awardForm.awardId,
        awardTitle: awardForm.awardTitle,
        awardDetail: awardForm.awardDetail,
      };
      setAwards((prev) => {
        return prev.map((el) => {
          if (el.awardId === award.awardId) return award;
          else return el;
        });
      });
      setIsEditing((prev) => !prev);
    } catch (error) {
      console.log("award편집에 실패하였습니다.", error);
    }
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
          <button className="edit-btn me-3" type="submit">
            확인
          </button>
          <button
                className="edit-cancel-btn"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            취소
          </button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default AwardEditForm;
