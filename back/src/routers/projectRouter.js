import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projService";

const projectRouter = Router();

projectRouter.post(
  "/project/add",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      // jwt 토큰에서 추출된 사용자id를 가지고 db에서 사용자 정보를 찾음
      const user_id = req.currentUserId;
      // req (request) 에서 데이터 가져오기
      const projTitle = req.body.projTitle;
      const projDetail = req.body.projDetail;
      const fromDate = req.body.fromDate;
      const toDate = req.body.toDate;

      const newProject = await projectService.addProject({
        id: user_id,
        projTitle,
        projDetail,
        fromDate,
        toDate,
      });
      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  }
);

// 등록된 Education 정보 수정하기
projectRouter.put(
  "/project/:projId",
  login_required,
  async function (req, res, next) {
    try {
      //URI로부터 pro_id 추출
      const projId = req.params.projId;
      // body data로부터 업데이트할 Project 정보 추출
      const projTitle = req.body.projTitle ?? null;
      const projDetail = req.body.projDetail ?? null;
      const fromDate = req.body.fromDate ?? null;
      const toDate = req.body.toDate ?? null;

      const toUpdate = { projTitle, projDetail, fromDate, toDate };

      //해당 사용자 아이디로 Project 정보를 db에서 찾아 업데이트함.
      const updateProject = await projectService.setProject({
        projId,
        toUpdate,
      });

      if (updateProject.errorMessage) {
        throw new Error(updateProject.errorMessage);
      }

      res.status(200).json(updateProject);
    } catch (error) {
      next(error);
    }
  }
);

// 현재 사용자의 project 정보 가져오기
projectRouter.get(
  "/project/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const currentProjectInfo = await projectService.getProjectInfo({
        user_id,
      });

      res.status(200).send(currentProjectInfo);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.delete(
  "/project/:projId",
  login_required,
  async function (req, res, next) {
    try {
      const proj_id = req.params.projId;
      const deletedProject = await projectService.deletedProject({ proj_id });

      if (deletedProject.errorMessage) {
        throw new Error(deletedProject.errorMessage);
      }
      res.status(200).json(deletedProject);
    } catch (error) {
      next(error);
    }
  }
);

export { projectRouter };
