import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
function EducationCard({ edu, setIsEditing, isEditable,setEdu }) {
  async function handleDelete(){
      const id = edu.id
      try{
          await Api.delete(`edu/${edu.eduId}`);
          // const res = await Api.get("edu",id);
          // setEdu(res.data);
          // console.log(res.data);
          // console.log(edu.eduId);
          setEdu((arr) => {
            const newArr = arr.filter(obj => {
              if(obj.eduId === edu.eduId) return false  //filter함수에서 false면 삭제됨.
              else return true

            } )
              return newArr

          });
      }catch(error){
        console.log("삭제에 실패했습니다.",error);
      }
      
  }
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

