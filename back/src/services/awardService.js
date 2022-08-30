import { Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class awardService {
  static async addAward({ id, awardTitle, awardDetail }) {
    const awardId = uuidv4();

    const newAward = { id, awardId, awardTitle, awardDetail };

    // db에 저장
    const createdNewAward = await Award.create({ newAward });
    // createdNewAward.errorMessage = null;

    return createdNewAward;
  }

  static async setAward({ awardId, toUpdate }) {
    // 우선 해당 id의 수상 이력 정보가 db에 존재하는지 여부 확인
    // let award = await Award.findById({ awardId: award_id });
    let award = await Award.findById({ awardId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage =
        "수상 이력 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상이 null 이 아니라면 업데이트 진행
    if (toUpdate.awardTitle) {
      const fieldToUpdate = "awardTitle";
      const newValue = toUpdate.awardTitle;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }

    if (toUpdate.awardDetail) {
      const fieldToUpdate = "awardDetail";
      const newValue = toUpdate.awardDetail;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }

    return award;
  }

  static async getAwardInfo({ user_id }) {
    const award = await Award.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage =
        "해당 유저는 수상 이력 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return award;
  }

  static async deletedAward({ award_id }) {
    const award = await Award.deleteOne({ award_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    // if (!award) {
    //   const errorMessage =
    //     "해당 유저는 수상 이력 정보가 없습니다. 다시 한 번 확인해 주세요.";
    //   return { errorMessage };
    // }
    return award;
  }
}

export { awardService };
