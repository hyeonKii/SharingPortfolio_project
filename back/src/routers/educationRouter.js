import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { eduService } from "../services/eduService";

const educationRouter = Router();

educationRouter.post(
  "/edu/add",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      const user_id = req.currentUserId;
      const school = req.body.school;
      const major = req.body.major;
      const degree = req.body.degree;

      const newEdu = await eduService.addEdu({
        id: user_id,
        school,
        major,
        degree,
      });
      res.status(201).json(newEdu);
    } catch (error) {
      next(error);
    }
  }
);

// 등록된 Education 정보 수정하기
educationRouter.put(
  "/edu/:eduId",
  login_required,
  async function (req, res, next) {
    try {
      //URI로부터 edu id 추출
      const education_id = req.params.eduId;
      // body data로부터 업데이트할 Education 정보 추출
      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const degree = req.body.degree ?? null;

      const toUpdate = { school, major, degree };

      //해당 사용자 아이디로 Education 정보를 db에서 찾아 업데이트함.
      const updatedEdu = await eduService.setEdu({ education_id, toUpdate });

      if (updatedEdu.errorMessage) {
        throw new Error(updatedEdu.errorMessage);
      }

      res.status(200).json(updatedEdu);
    } catch (error) {
      next(error);
    }
  }
);

// 현재 사용자의 Education 정보 가져오기
educationRouter.get(
  "/edu/:id",
  login_required,
  async function (req, res, next) {
    try {
      // const user_id = req.currentUserId; // 현재 사용자 id만 가져오는 코드
      const user_id = req.params.id;
      const currentEduInfo = await eduService.getEduInfo({ user_id });

      res.status(200).send(currentEduInfo);
    } catch (error) {
      next(error);
    }
  }
);

//추가기능. 삭제
educationRouter.delete(
  "/edu/:eduId",
  login_required,
  async function (req, res, next) {
    try {
      //URI로부터 edu id 추출
      const education_id = req.params.eduId;

      //해당 사용자 아이디로 Education 정보를 db에서 찾아 삭제함.

      const deletedEdu = await eduService.deletedEdu({ education_id });

      if (deletedEdu.errorMessage) {
        throw new Error(deletedEdu.errorMessage);
      }

      res.status(200).json(deletedEdu);
    } catch (error) {
      next(error);
    }
  }
);

export { educationRouter };
