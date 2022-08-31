import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";

function certificateCard({certificate,isEditable,setIsEditing,setCertificates}){
  async function handleDelete(){
    const id = certificate.id
    try{
        await Api.delete(`certi/${certificate.certiId}`);
        // const res = await Api.get("certi",id);
        // console.log(res.data)
        // setCertificates(res.data);
        setCertificates((arr) => {
          const newArr = arr.filter(obj => {
            if(obj.certiId === certificate.certiId) return false  
            //filter함수에서 false면 삭제
            else return true

          } )
            return newArr

        });
    }catch(error){
      console.log(error);
    }
    
}
    return (
      <Card.Text>
      <Row className="align-items-center">
      <Col>
        {certificate.certiTitle}
        <br />
        <span className="text-muted">{certificate.certiDetail}</span>
        <br />
        <span className="text-muted">{certificate.certiDate.split("T")[0]}</span>
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
    )
}

export default certificateCard;
