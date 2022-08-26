import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";

class projectService {
  static async addProject({ id, projectTitle, projectDetail, fromDate, toDate }) {
    const pro_id = uuidv4();

    const newProject = { 
        id, 
        pro_id, 
        projectTitle, 
        projectDetail, 
        fromDate, 
        toDate,
    };

    // db에 저장
    const createdNewProject = await Project.create({ newProject });

    return createdNewProject;
  }

  static async setProject({ project_id, toUpdate }) {
    // 우선 해당 id 의 학력사항이 db에 존재하는지 여부 확인
    let project = await Project.findById({ project_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage = "프로젝트 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상이 null 이 아니라면 업데이트 진행
    if (toUpdate.projectTitle) {
      const fieldToUpdate = "projectTitle";
      const newValue = toUpdate.projectTitle;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    if (toUpdate.projectDetail) {
      const fieldToUpdate = "projectDetail";
      const newValue = toUpdate.projectDetail;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    if (toUpdate.fromDate) {
      const fieldToUpdate = "fromDate";
      const newValue = toUpdate.fromDate;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    if (toUpdate.toDate) {
        const fieldToUpdate = "toDate";
        const newValue = toUpdate.toDate;
        project = await Project.update({ project_id, fieldToUpdate, newValue });
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
}

export { projectService };
