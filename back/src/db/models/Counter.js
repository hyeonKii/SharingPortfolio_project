import { CounterModel } from "../schemas/award";

class Counter {
  static async findByUserId({ user_id }) {
    const award = await CounterModel.find({ id: user_id });
    return award;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCounter = await CounterModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCounter;
  }
}

export { Counter };
