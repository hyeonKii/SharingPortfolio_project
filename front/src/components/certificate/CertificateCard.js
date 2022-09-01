import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";

function certificateCard({certificate, isEditable, setIsEditing, setCertificates}) {
  async function handleDelete() {
    try {
      await Api.delete(`certi/${certificate.certiId}`);
      setCertificates((arr) => {
        const newArr = arr.filter((obj) => {
          if (obj.certiId === certificate.certiId) return false;
          else return true;
        });
        return newArr;
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col sm={10}>
          <span>{certificate.certiTitle}</span>
          <br />
          <span className="text-muted">{certificate.certiDetail}</span>
          <br />
          <span className="text-muted">{certificate.certiDate.split("T")[0]}</span>
        </Col>

        {isEditable && (
          <Col sm={2}>
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3 me-2"
            >
              편집
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              className="mr-3"
              onClick={handleDelete}
            >
              삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default certificateCard;
