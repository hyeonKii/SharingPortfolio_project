import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
function AwardCard({ award, isEditable, setIsEditing ,setAwards}) {
  async function handleDelete() {
    const id = award.id;
    try {
      await Api.delete(`award/${award.awardId}`);
      setAwards((arr) => {
        const newArr = arr.filter((obj) => {
          if (obj.awardId === award.awardId)
            return false; //filter함수에서 false면 삭제됨.
          else return true;
        });
        return newArr;
      });
    } catch (error) {
      console.log("삭제에 실패했습니다.", error);
    }
  }
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{award.awardTitle}</span>
          <br />
          <span className="text-muted">{award.awardDetail}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
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

export default AwardCard;
