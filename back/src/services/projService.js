import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";

class projectService {
  static async addProject({ id, projTitle, projDetail, fromDate, toDate }) {
    const projId = uuidv4();

    const newProject = {
      id,
      projId,
      projTitle,
      projDetail,
      fromDate,
      toDate,
    };

    // db에 저장
    const createdNewProject = await Project.create({ newProject });

    return createdNewProject;
  }

  static async setProject({ projId, toUpdate }) {
    // 우선 해당 id 의 학력사항이 db에 존재하는지 여부 확인
    let project = await Project.findById({ projId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage =
        "프로젝트 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상이 null 이 아니라면 업데이트 진행
    if (toUpdate.projTitle) {
      const fieldToUpdate = "projTitle";
      const newValue = toUpdate.projTitle;
      project = await Project.update({ projId, fieldToUpdate, newValue });
    }

    if (toUpdate.projDetail) {
      const fieldToUpdate = "projDetail";
      const newValue = toUpdate.projDetail;
      project = await Project.update({ projId, fieldToUpdate, newValue });
    }

    if (toUpdate.fromDate) {
      const fieldToUpdate = "fromDate";
      const newValue = toUpdate.fromDate;
      project = await Project.update({ projId, fieldToUpdate, newValue });
    }

    if (toUpdate.toDate) {
      const fieldToUpdate = "toDate";
      const newValue = toUpdate.toDate;
      project = await Project.update({ projId, fieldToUpdate, newValue });
    }

    return project;
  }

  static async getProjectInfo({ user_id }) {
    const project = await Project.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return project;
  }

  static async deletedProject({ proj_id }) {
    const project = await Project.deleteOne({ proj_id });

    return project;
  }
}

export { projectService };
