import { Card, Row, Button, Col } from "react-bootstrap";

function EducationCard({ edu, setIsEditing, isEditable }) {
  return (
    <Card.Text>
      <Row>
       <Col xl={11}>
          {edu.school}
          <br />
          {edu.major} ({edu.degree})
        </Col>
      {isEditable && (
        <Col xl={1}>
          <Button
            variant="outline-info"
            onClick={() =>
              setIsEditing((position) => {
                return !position;})}>
            편집
          </Button>
        </Col>
       
      )}
       </Row>
    </Card.Text>
  );
}
export default EducationCard;

