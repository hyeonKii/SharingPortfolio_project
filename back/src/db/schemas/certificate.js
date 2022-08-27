import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    id: {
      // type: Schema.Types.ObjectId,
      // ref: "User",
      type: String,
      required: true,
    },
    certi_id: {
      type: String,
      required: true,
    },
    certiTitle: {
      type: String,
      required: true,
    },
    certiDetail: {
      type: String,
      required: true,
    },
    certiDate: {
      //   type: String,
      //   format: Date,
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
