import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";

//test
// import profileImageFilename from "/back/uploads";

//test

function UserCard({
  user,
  setIsEditing,
  isEditable,
  isNetwork,
  profileImageFilename,
}) {
  const navigate = useNavigate();

  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          {user?.profileImageFilename ? (
            <Card.Img
              style={{ width: "10rem", height: "8rem" }}
              className="mb-3"
              src={`http://localhost:5001/${user?.profileImageFilename}`}
              alt="사용자 등록 프로필 이미지"
            />
          ) : (
            <Card.Img
              style={{ width: "10rem", height: "8rem" }}
              className="mb-3"
              src="http://placekitten.com/200/200"
              alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
            />
          )}
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            포트폴리오
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
