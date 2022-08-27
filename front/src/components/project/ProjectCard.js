import { Card, Button, Row, Col } from "react-bootstrap";

function ProjectCard({ project, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="justify-content-between align-items-center mb-2">
        <Col>
          {project.projectTitle}
          <br />
          <span className="text-muted">{project.projectDetail}</span>
          <br />
          <span className="text-muted">
            {`${project.fromDate} ~ ${project.toDate}`}
          </span>
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
  );
}

export default ProjectCard;
