import mongoose from "mongoose";

const departmentSchema =
    new mongoose.Schema(
        {
            title: {
                type: String,
                required: true
            },

            slug: {
                type: String,
                required: true
            },

            image: {
                type: String
            },

            description: {
                type: String
            }
        },
        {
            timestamps: true
        }
    );

export default mongoose.model(
    "Department",
    departmentSchema
);