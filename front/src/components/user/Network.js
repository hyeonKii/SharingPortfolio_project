import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Form,
  ButtonGroup,
  Button,
  Col,
  Table,
} from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";
import UserTable from "./UserTable";
function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showCard, setShowCard] = useState(true);
  function toggleShow() {
    setShowCard(!showCard);
  }

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist").then((res) => setUsers(res.data));
  }, [userState, navigate]);

  return (
    <>
      <Container>
        <Row>
          <Col md={{ span: 1, offset: 5 }}>
            <Form className="mb-3 ms-3 mr-10">
              <input
                type="text"
                value={search}
                placeholder="검색"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Col>
          <Col md={{ span: 1, offset: 5 }}>
            <ButtonGroup aria-label="Basic example">
              <Button
                variant="secondary"
                onClick={toggleShow}
                style={showCard ? { color: "navy" } : { color: "white" }}
              >
                Card
              </Button>
              <Button
                variant="secondary"
                onClick={toggleShow}
                style={!showCard ? { color: "navy" } : { color: "white" }}
              >
                Table
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
      {showCard ? (
        <Container fluid>
          <Row xs="auto" className="justify-content-md-center">
            {users
              .filter((data) => {
                if (search === "") {
                  return data;
                } else if (data.name.includes(search)) {
                  return data;
                }
              })
              .map((user) => {
                return <UserCard key={user.id} user={user} isNetwork />;
              })}
          </Row>
        </Container>
      ) : (
        <Container fluid="md">
          <Table className="mb-2 ms-3 mr-5" style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Description</th>
                <th>Portfolio</th>
              </tr>
            </thead>
            {users
              .filter((data) => {
                if (search === "") {
                  return data;
                } else if (data.name.includes(search)) {
                  return data;
                }
              })
              .map((user) => {
                return <UserTable key={user.id} user={user} isNetwork />;
              })}
          </Table>
        </Container>
      )}
    </>
  );
}

export default Network;
