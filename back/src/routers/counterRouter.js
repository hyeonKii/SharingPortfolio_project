import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { counterService } from "../services/counterService";

const counterRouter = Router();

counterRouter.post(
  "/award/add",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      const user_id = req.currentUserId;
      const awardTitle = req.body.awardTitle;
      const awardDetail = req.body.awardDetail;

      const newAward = await counterService.addAward({
        id: user_id,
        awardTitle,
        awardDetail,
      });

      if (newAward.errorMessage) {
        throw new Error(newAward.errorMessage);
      }

      res.status(201).json(newAward);
    } catch (error) {
      next(error);
    }
  }
);

// 등록된 수상 이력 정보 수정하기
counterRouter.put(
  "/award/:awardId",
  login_required,
  async function (req, res, next) {
    try {
      //URI로부터 award id 추출
      const awardId = req.params.awardId;
      // body data로부터 업데이트할 수상 이력 정보 추출
      const awardTitle = req.body.awardTitle ?? null;
      const awardDetail = req.body.awardDetail ?? null;

      const toUpdate = { awardTitle, awardDetail };

      //해당 사용자 아이디로 수상 이력 정보를 db에서 찾아 업데이트함.
      const updatedAward = await counterService.setAward({ awardId, toUpdate });

      if (updatedAward.errorMessage) {
        throw new Error(updatedAward.errorMessage);
      }

      res.status(200).json(updatedAward);
    } catch (error) {
      next(error);
    }
  }
);

// 현재 사용자의 수상 이력 정보 가져오기
counterRouter.get("/award", login_required, async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
    const currentAwardInfo = await counterService.getAwardInfo({ user_id });

    res.status(200).send(currentAwardInfo);
  } catch (error) {
    next(error);
  }
});

export { counterRouter };
