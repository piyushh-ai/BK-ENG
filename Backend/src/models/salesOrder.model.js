import mongoose from "mongoose";

const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "partial"],
      required: true,
    },
    remark: {
      type: String,
      trim: true,
      default: "",
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    changedByName: {
      type: String,
      default: "",
    },
  },
  { _id: true, timestamps: true }
);

const salesOrderSchema = new mongoose.Schema(
  {
    partyName: {
      type: String,
      required: [true, "Party name is required"],
      trim: true,
    },
    // Each image: Cloudinary URL + publicId (needed for deletion)
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
      },
    ],
    description: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "partial"],
      default: "pending",
    },
    remark: {
      type: String,
      trim: true,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    // ── Status audit trail ────────────────────────────────────
    statusHistory: {
      type: [statusHistorySchema],
      default: [],
    },
  },
  {
    timestamps: true, // auto createdAt & updatedAt
  }
);

const salesOrderModel = mongoose.model("SalesOrder", salesOrderSchema);
export default salesOrderModel;
