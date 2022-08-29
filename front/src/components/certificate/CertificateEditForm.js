import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CertiEditForm({ currentcertificate, setIsEditing, setCertificates }) {
  // const [certiTitle, setCertiTitle] = useState(currentcertificate.certiTitle);
  // const [certiDetail, setCertiDetail] = useState(currentcertificate.certiDetail);
  const [certi_Date,setCerti_Date] = useState(new Date(currentcertificate.certiDate));

  const [certiForm, setCertiForm] = useState({
    certiTitle: currentcertificate.certiTitle,
    certiDetail: currentcertificate.certiDetail,
});
function handleOnchange(e) {
  const { name, value } = e.target;
  setCertiForm((prev) => ({
    ...prev,
    [name]: value,
  }));
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = currentcertificate.id;
    const certiDate=certi_Date.toISOString().split("T")[0];
    //try~catch
    try{
      await Api.put(`certi/${currentcertificate.certiId}/update`, {
        id,
        ...certiForm,
        certiDate,
      });}catch(err){
        console.log("편집에 실패하였습니다.",err);
      }
    
    const res = await Api.get("certi");
    // res.data가 배열인지 확인
    if (!Array.isArray(res.data)) {
      console.log("res.data is not array");
      return;
    }
    setCertificates(res.data);
    setIsEditing(prev=>!prev);
  };

  return (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="certificateEditTitle" className="mb-3">
            <Form.Control
              type="text"
              placeholder="자격증 이름"
              name = "certiTitle"
              value={certiForm.certiTitle}
              onChange={handleOnchange}
            />
          </Form.Group>

          <Form.Group controlId="certificateEditDetail" className="mb-3">
            <Form.Control
              type="detail"
              placeholder="세부사항"
              name = "certiDetail"
              value={certiForm.certiDetail}
              onChange={handleOnchange}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3">
          <Col xs="auto">
            <DatePicker
            selected={certi_Date} 
            onChange={(date) => setCerti_Date(date)}
          />
          </Col>
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(prev=>!prev)}>
                취소
              </Button>
              </Col>
              
          </Form.Group>
        </Form>
  );
}

export default CertiEditForm;
