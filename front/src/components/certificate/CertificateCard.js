import { Card, Row, Button, Col } from "react-bootstrap";

function certificateCard({certificate,isEditable,setIsEditing}){
    return (
      <Card.Text>
      <Row className="align-items-center">
      <Col>
        {certificate.certiTitle}
        <br />
        <span className="text-muted">{certificate.certiDetail}</span>
        <br />
        <span className="text-muted">{certificate.certiDate}</span>
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
          </Col>
        )}
        
      </Row>
      </Card.Text>
    )
}

export default certificateCard;
