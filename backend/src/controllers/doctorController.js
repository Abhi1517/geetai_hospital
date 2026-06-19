import Doctor from "../models/Doctor.js";

export const createDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.create(req.body);

        res.status(201).json({
            success: true,
            doctor,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();

        res.status(200).json({
            success: true,
            doctors,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const updateDoctor = async (req, res) => {
    try {

        const doctor =
            await Doctor.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                }
            );

        res.status(200).json({
            success: true,
            doctor,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
export const deleteDoctor = async (req, res) => {

    try {

        await Doctor.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Doctor Deleted",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};