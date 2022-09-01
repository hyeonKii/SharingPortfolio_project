import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form} from "react-bootstrap";

import * as Api from "../../api";
import "../components.css";
function RegisterForm() {
  const navigate = useNavigate();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");
  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post("user/register", {
        email,
        password,
        name,
      });

      // 로그인 페이지로 이동함.
      navigate("/login");
    } catch (err) {
      console.log("회원가입에 실패하였습니다.", err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col lg={8}>
          <Form onSubmit={handleSubmit}>
            <div className="form-login">
              <Form.Group controlId="registerEmail">
                <div className="submit-info">이메일 주소</div>
                <Form.Control
                  type="email"
                  autoComplete="off"
                  value={email}
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isEmailValid && (
                  <div className="message">
                    이메일 형식이 올바르지 않습니다.
                  </div>
                )}
              </Form.Group>

              <Form.Group controlId="registerPassword" className="mt-3">
                <div className="submit-info">비밀번호</div>
                <Form.Control
                  type="password"
                  autoComplete="off"
                  value={password}
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isPasswordValid && (
                  <div className="message">비밀번호는 4글자 이상입니다.</div>
                )}
              </Form.Group>

              <Form.Group controlId="registerConfirmPassword" className="mt-3">
                <div className="submit-info">비밀번호 재확인</div>
                <Form.Control
                  type="password"
                  autoComplete="off"
                  value={confirmPassword}
                  placeholder="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {!isPasswordSame && (
                  <div className="message">비밀번호가 일치하지 않습니다.</div>
                )}
              </Form.Group>

              <Form.Group controlId="registerName" className="mt-3">
                <div className="submit-info">이름</div>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  value={name}
                  placeholder="이름"
                  onChange={(e) => setName(e.target.value)}
                />
                {!isNameValid && (
                  <div className="message">
                    이름은 2글자 이상으로 설정해 주세요.
                  </div>
                )}
              </Form.Group>

              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <button
                    className="sign-up"
                    type="submit"
                    disabled={!isFormValid}
                  >
                    회원가입
                  </button>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <button
                    className="sign-in"
                    onClick={() => navigate("/login")}
                  >
                    로그인하기
                  </button>
                </Col>
              </Form.Group>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterForm;
