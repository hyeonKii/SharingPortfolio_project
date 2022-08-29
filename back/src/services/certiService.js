import { Certificate } from "../db";
import { v4 as uuidv4 } from "uuid";

class certiService {
  static async addCerti({ id, certiTitle, certiDetail, certiDate }) {
    const certiId = uuidv4();

    const newCerti = { id, certiId, certiTitle, certiDetail, certiDate };

    // db에 저장
    const createdNewCerti = await Certificate.create({ newCerti });

    return createdNewCerti;
  }

  static async setCerti({ certificate_id, toUpdate }) {
    // 우선 해당 id 의 학력사항이 db에 존재하는지 여부 확인
    let certi = await Certificate.findById({ certificate_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certi) {
      const errorMessage = "자격증 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상이 null 이 아니라면 업데이트 진행
    if (toUpdate.certiTitle) {
      const fieldToUpdate = "certiTitle";
      const newValue = toUpdate.certiTitle;
      certi = await Certificate.update({
        certificate_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.certiDetail) {
      const fieldToUpdate = "certiDetail";
      const newValue = toUpdate.certiDetail;
      certi = await Certificate.update({
        certificate_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.certiDate) {
      const fieldToUpdate = "certiDate";
      const newValue = toUpdate.certiDate;
      certi = await Certificate.update({
        certificate_id,
        fieldToUpdate,
        newValue,
      });
    }

    return certi;
  }

  static async getCertiInfo({ user_id }) {
    const certi = await Certificate.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certi) {
      const errorMessage =
        "해당 사용자는 자격증 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return certi;
  }

  //추가기능 삭제
  static async deletedCerti({ certificate_id }) {
    const certi = await Certificate.deleteOne({ certificate_id });

    return certi;
  }
}

export { certiService };
