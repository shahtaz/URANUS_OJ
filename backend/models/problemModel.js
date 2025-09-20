import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    inputFormat: {
      type: String,
      required: true,
    },
    outputFormat: {
      type: String,
      required: true,
    },
    sampleTestCases: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true },
        explanation: { type: String },
      },
    ],
    hiddenTestCases: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true },
      },
    ],
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
    submissions: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        code: String,
        language: String,
        status: {
          type: String,
          enum: [
            "Accepted",
            "Wrong Answer",
            "Time Limit Exceeded",
            "Runtime Error",
            "Compilation Error",
          ],
        },
        submittedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
