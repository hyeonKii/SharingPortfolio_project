import { ProjectModel } from "../schemas/project";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async findById({ projId }) {
    const project = await ProjectModel.findOne({ projId });
    return project;
  }

  static async findByUserId({ user_id }) {
    const project = await ProjectModel.find({ id: user_id });
    return project;
  }

  static async update({ projId, fieldToUpdate, newValue }) {
    const filter = { projId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updateProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updateProject;
  }

  static async deleteOne({ proj_id }) {
    const project = await ProjectModel.deleteOne({ projId: proj_id });
    return project;
  }
}

export { Project };
