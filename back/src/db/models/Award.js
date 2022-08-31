import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  // static async findByEmail({ email }) {
  //   const award = await AwardModel.findOne({ email });
  //   return award;
  // }

  static async findById({ awardId }) {
    const award = await AwardModel.findOne({ awardId });
    return award;
  }

  static async findByUserId({ user_id }) {
    const award = await AwardModel.find({ id: user_id });
    return award;
  }

  static async update({ awardId, fieldToUpdate, newValue }) {
    const filter = { awardId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }

  static async deleteOne({ award_id }) {
    const award = await AwardModel.deleteOne({ awardId: award_id });
    return award;
  }
}

export { Award };
