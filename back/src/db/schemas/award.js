import { Schema, model } from "mongoose";

const AwardSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    awardId: {
      type: String,
      require: true,
    },
    awardTitle: {
      type: String,
      required: true,
    },
    awardDetail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
