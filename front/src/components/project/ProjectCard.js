import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function ProjectCard({ project, isEditable, setIsEditing, setProjects}) {
  async function handleDelete(){
    // const id = project.id
    try{
      await Api.delete(`project/${project.projId}`);
      // const res = await Api.get("project", id);
      // setProjects(res.data);
      setProjects((arr) => {
        const newArr = arr.filter(obj => {
          if(obj.projId === project.projId) return false
          else return true
        })
        return newArr
      });
    }catch(error){
      console.log("삭제에 실패했습니다.", error);
    }
  }
  
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          {project.projTitle}
          <br />
          <span className="text-muted">{project.projDetail}</span>
          <br />
          <span className="text-muted">
            {`${project.fromDate.split("T")[0]} ~ ${project.toDate.split("T")[0]}`}
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
