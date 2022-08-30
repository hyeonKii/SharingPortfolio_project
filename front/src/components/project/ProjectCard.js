import { Card, Button, Row, Col } from "react-bootstrap";

function ProjectCard({ project, isEditable, setIsEditing, setProjects}) {
  async function handleDelete() {
    const id = project.id
    try{
      await Api.delete(`project/${project.projId}`);
      const res = await Api.get(`project`, id);
      setProjects(res.data);
    }catch(error){
      console.log(error);
    }
  }
  
  return (
    <Card.Text>
      <Row className="justify-content-between align-items-center mb-2">
        <Col>
          {project.projTitle}
          <br />
          <span className="text-muted">{project.projDetail}</span>
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

export default ProjectCard;
