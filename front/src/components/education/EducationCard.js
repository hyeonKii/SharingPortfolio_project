import { Card, Row, Button, Col } from "react-bootstrap";

function EducationCard({ edu, setIsEditing, isEditable }) {
  return (
    <Card.Text>
      <Row className="justify-content-between align-items-center mb-2">
       <Col>
          {edu.school}
          <br />
          {edu.major} ({edu.degree})
        </Col>
      {isEditable && (
        <Col  xs lg="1">
          <Button
            variant="outline-info"
            size="sm"
            className="mr-3"
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

