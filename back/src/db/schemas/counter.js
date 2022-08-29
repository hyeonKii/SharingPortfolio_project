import { Schema, model } from "mongoose";

const CounterSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },

    viewCounter: {
      type: Number,
      required: true,
    },
    like: {
      type: Boolean,
      required: true,
    },
    likeCounter: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CounterModel = model("Counter", CounterSchema);

export { CounterModel };
