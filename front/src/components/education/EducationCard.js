import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
function EducationCard({ edu, setIsEditing, isEditable, setEdu }) {
  async function handleDelete() {
    try {
      await Api.delete(`edu/${edu.eduId}`);
      setEdu((arr) => {
        const newArr = arr.filter((obj) => {
          if (obj.eduId === edu.eduId) return false;
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
      <Row className="justify-content-between align-items-center mb-2">
        <Col sm={10}>
          <span>{edu.school}</span>
          <br />
          <span className="text-muted">{edu.major} ({edu.degree})</span>
        </Col>
        {isEditable && (
          <Col sm={2}>
            <Button
              variant="outline-info"
              size="sm"
              className="mr-3 me-2"
              onClick={() =>
                setIsEditing((position) => {
                  return !position;
                })
              }
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
export default EducationCard;
