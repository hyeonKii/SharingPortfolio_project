import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certiService } from "../services/certiService";

const certificateRouter = Router();

certificateRouter.post(
  "/certi/add",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      // req (request) 에서 데이터 가져오기
      const user_id = req.currentUserId;
      const certiTitle = req.body.certiTitle;
      const certiDetail = req.body.certiDetail;
      const certiDate = req.body.certiDate;

      const newCerti = await certiService.addCerti({
        id: user_id,
        certiTitle,
        certiDetail,
        certiDate,
      });
      res.status(201).json(newCerti);
    } catch (error) {
      next(error);
    }
  }
);

// 등록된 Certificate 정보 수정하기
certificateRouter.put(
  "/certi/:certiId",
  login_required,
  async function (req, res, next) {
    try {
      //URI로부터 certi id 추출
      const certificate_id = req.params.certiId;
      // body data로부터 업데이트할 Education 정보 추출
      const certiTitle = req.body.certiTitle ?? null;
      const certiDetail = req.body.certiDetail ?? null;
      const certiDate = req.body.certiDate ?? null;

      const toUpdate = { certiTitle, certiDetail, certiDate };

      //해당 사용자 아이디로 Education 정보를 db에서 찾아 업데이트함.
      const updatedCerti = await certiService.setCerti({
        certificate_id,
        toUpdate,
      });

      if (updatedCerti.errorMessage) {
        throw new Error(updatedCerti.errorMessage);
      }

      res.status(200).json(updatedCerti);
    } catch (error) {
      next(error);
    }
  }
);

// 현재 사용자의 Education 정보 가져오기
certificateRouter.get(
  "/certi/:id",
  login_required,
  async function (req, res, next) {
    try {
      // const user_id = req.currentUserId;
      const user_id = req.params.id;
      const currentCertiInfo = await certiService.getCertiInfo({ user_id });

      res.status(200).send(currentCertiInfo);
    } catch (error) {
      next(error);
    }
  }
);

//추가기능. 삭제
certificateRouter.delete(
  "/certi/:certiId",
  login_required,
  async function (req, res, next) {
    try {
      //URI로부터 certi id 추출
      const certificate_id = req.params.certiId;

      //해당 사용자 아이디로 Education 정보를 db에서 찾아 삭제함.

      const deletedCerti = await certiService.deletedCerti({ certificate_id });

      if (deletedCerti.errorMessage) {
        throw new Error(deletedCerti.errorMessage);
      }

      res.status(200).json(deletedCerti);
    } catch (error) {
      next(error);
    }
  }
);

export { certificateRouter };
