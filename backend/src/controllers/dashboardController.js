import Doctor from "../models/Doctor.js";
import Department from "../models/Department.js";
import Appointment from "../models/Appointment.js";
import Blog from "../models/Blog.js";

export const getStats = async (req, res) => {
  try {
    const doctors = await Doctor.countDocuments();
    const departments = await Department.countDocuments();
    const appointments = await Appointment.countDocuments();
    const blogs = await Blog.countDocuments();

    res.json({ doctors, departments, appointments, blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
