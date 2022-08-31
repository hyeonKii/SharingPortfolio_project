import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";


function CertifiAddForm({ portfolioOwnerId, setIsAdding, setCertificates }) {
  // const [certiTitle, setCertiTitle] = useState("");
  // const [certiDetail, setCertiDetail] = useState("");
  // const [certi_Date,setCerti_Date] = useState(new Date());

// 1번리뷰 수정
  const [certiForm, setCertiForm] = useState({
    certiTitle: "",
    certiDetail: "",
    certiDate: new Date()
});

function handleOnchange(e){
  const {name,value} = e.target;
  setCertiForm(prev=>({
   ...prev,
   [name]:value,
  }));
}
const handleDataChange = (date) =>{
  setCertiForm(prev=>({
    ...prev,
    certiDate:date,
}));
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id=portfolioOwnerId;
    // const certiDate=certi_Date;
    // const certiDate=certiForm.certi_Datecerti_Date.toISOString().split("T")[0];
    try {
      const res=await Api.post("certi/add", {
        id,
        ...certiForm,
      });
      setCertificates((prev)=>[...prev,res.data]);
      setIsAdding((prev) => !prev);
      
    } catch (err) {
      console.log("등록에 실패하였습니다.", err);
    }
    
    // const res = await Api.get("certi",id);
    //res.data가 배열인지 확인
    // if (!Array.isArray(res.data)) {
    //   console.log("res.data is not array");
    //   return;
    // }

    // setCertificates(res.data);
    // setIsAdding(prev=>!prev);
  };

  return (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="certifiAddTitle">
            <Form.Control
              type="text"
              placeholder="자격증 이름"
              name = "certiTitle"
              value={certiForm.certiTitle}
              onChange={handleOnchange}
            />
          </Form.Group>

          <Form.Group controlId="certifiAddDetail" className="mt-3">
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
            selected={certiForm.certiDate} 
            onChange={handleDataChange}
          />
          </Col>
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsAdding(prev=>!prev)}>
                취소
              </Button>
              </Col>
              
          </Form.Group>
        </Form>

  );
}

export default CertifiAddForm;
