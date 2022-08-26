import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findByEmail({ email }) {
    const award = await AwardModel.findOne({ email });
    return award;
  }

  static async findById({ award_id }) {
    const award = await AwardModel.findOne({ award_id });
    return award;
  }

  static async findByUserId({ user_id }) {
    const award = await AwardModel.find({ id: user_id });
    return award;
  }

  static async update({ award_id, fieldToUpdate, newValue }) {
    const filter = { award_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }
}

export { Award };
