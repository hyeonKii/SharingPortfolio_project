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
    const edu = await EducationModel.findOne({ edu_id: education_id });
    return edu;
  }

  static async findByUserId({ user_id }) {
    const edu = await EducationModel.find({ id: user_id });
    return edu;
  }

  static async update({ education_id, fieldToUpdate, newValue }) {
    const filter = { edu_id: education_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updateEdu = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updateEdu;
  }
}

export { Education };
