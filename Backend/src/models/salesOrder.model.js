import mongoose from "mongoose";

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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  {
    timestamps: true, // auto createdAt & updatedAt
  }
);

const salesOrderModel = mongoose.model("SalesOrder", salesOrderSchema);
export default salesOrderModel;
