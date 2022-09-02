import React, { useState } from "react";
import { Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import "../components.css";
function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);
  // const [uploadstate,setUploadState]=useState(false)
  //useState로 profileImageUrl 상태를 생성함
  const [profileImageFilename, setprofileImageFilename] = useState(
    user.profileImageFilename
  );
  //파일 미리볼 url을 저장해줄 state
  const [fileprevImage, setFileprevImage] = useState("");
  // 파일 정보 저장
  const setFilepreviewImage = (e) => {
    setFileprevImage(URL.createObjectURL(e.target.files[0]));
  };

  const upload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const res = await Api.upload("user/profile", `${user.id}`, formData);
    const impageUpload = await res;
    setprofileImageFilename(impageUpload);
    setFilepreviewImage(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
      profileImageFilename,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    //res.data에 profileImageFilename이 null값으로 나옴
    console.log(res.data);
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Card className="profile-card">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {fileprevImage ? (
            <Card.Img
              style={{ width: "10rem", height: "8rem" }}
              className="mb-3"
              src={`${fileprevImage}`}
              alt="사용자 업로드 프로필 이미지"
            />
          ) : (
            <Card.Img
              style={{ width: "10rem", height: "8rem" }}
              className="mb-3"
              src={`http://kdt-ai5-team11.elicecoding.com:5001/${user?.profileImageFilename}`}
              alt="사용자 등록 프로필 이미지"
            />
          )}
          <Form.Group controlId="userEditProfileImage" className="mb-3">
            <Form.Control
              type="file"
              name="file"
              method="post"
              encType="multipart/form-data"
              onChange={(e) => upload(e)}
            />
          </Form.Group>

          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <button className="edit-btn me-3" type="submit">
                확인
              </button>
              <button
                className="edit-cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                취소
              </button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
