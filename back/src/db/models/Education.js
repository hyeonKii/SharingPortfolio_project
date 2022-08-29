import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEdu }) {
    const createdNewEdu = await EducationModel.create(newEdu);
    return createdNewEdu;
  }

  static async findByEmail({ email }) {
    const education = await EducationModel.findOne({ email });
    return education;
  }

  static async findById({ education_id }) {
    const edu = await EducationModel.findOne({ eduId: education_id });
    return edu;
  }

  static async findByUserId({ user_id }) {
    const edu = await EducationModel.find({ id: user_id });
    return edu;
  }

  static async update({ education_id, fieldToUpdate, newValue }) {
    const filter = { eduId: education_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updateEdu = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updateEdu;
  }

  //주가기능 삭제
  static async deleteOne({ education_id }) {
    const edu = await EducationModel.deleteOne({ eduId: education_id });
    return edu;
  }
}

export { Education };
