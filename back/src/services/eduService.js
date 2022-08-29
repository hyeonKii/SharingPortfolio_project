import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class eduService {
  static async addEdu({ id, school, major, degree }) {
    const eduId = uuidv4();

    const newEdu = { id, eduId, school, major, degree };

    // db에 저장
    const createdNewEdu = await Education.create({ newEdu });

    return createdNewEdu;
  }

  static async setEdu({ education_id, toUpdate }) {
    // 우선 해당 id 의 학력사항이 db에 존재하는지 여부 확인
    let edu = await Education.findById({ education_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!edu) {
      const errorMessage = "학력 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상이 null 이 아니라면 업데이트 진행
    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      edu = await Education.update({ education_id, fieldToUpdate, newValue });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      edu = await Education.update({
        education_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.degree) {
      const fieldToUpdate = "degree";
      const newValue = toUpdate.degree;
      edu = await Education.update({ education_id, fieldToUpdate, newValue });
    }

    return edu;
  }

  static async getEduInfo({ user_id }) {
    const edu = await Education.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!edu) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return edu;
  }

  //추가기능 삭제
  static async deletedEdu({ education_id }) {
    const edu = await Education.deleteOne({ education_id });

    return edu;
  }
}

export { eduService };
