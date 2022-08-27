import { ProjectModel } from "../schemas/project";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async findById({ project_id }) {
    const project = await ProjectModel.findOne({ pro_id: project_id });
    return project;
  }

  static async findByUserId({ user_id }) {
    const project = await ProjectModel.find({ id: user_id });
    return project;
  }

  static async update({ project_id, fieldToUpdate, newValue }) {
    const filter = { pro_id: project_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updateProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updateProject;
  }
}

export { Project };
