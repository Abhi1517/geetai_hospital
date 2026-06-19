import mongoose from "mongoose";

const departmentSchema =
    new mongoose.Schema(
        {
            title: {
                type: String,
                required: true,
            },

            slug: {
                type: String,
                unique: true,
                lowercase: true,
                trim: true,
            },

            image: {
                type: String,
                default: "",
            },

            description: {
                type: String,
            },

            status: {
                type: String,
                enum: ["active", "inactive"],
                default: "active",
            },
        },
        {
            timestamps: true,
        }
    );

export default mongoose.model(
    "Department",
    departmentSchema
);