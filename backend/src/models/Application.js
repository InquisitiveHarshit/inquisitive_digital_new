import mongoose from "mongoose";
import crypto from "crypto";

const applicationSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => crypto.randomUUID()
    },
    job_id: {
      type: String,
      ref: "Job",
      required: true
    },
    full_name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    cover_letter: {
      type: String,
      default: "",
      trim: true
    },
    resume_url: {
      type: String,
      required: true,
      trim: true
    },
    resume_original_name: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["pending", "shortlisted", "rejected"],
      default: "pending",
      lowercase: true,
      trim: true
    }
  },
  {
    timestamps: { createdAt: "applied_at", updatedAt: false },
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

export default mongoose.models.Application || mongoose.model("Application", applicationSchema);
