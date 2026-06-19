import Doctor from "../models/Doctor.js";
import cloudinary from "../config/cloudinary.js";

const uploadImage = async (file) => {
  if (!file) return "";

  const result = await cloudinary.uploader.upload(file.path, {
    folder: "doctors",
  });

  return result.secure_url;
};

export const createDoctor = async (req, res) => {
  try {
    const imageUrl = await uploadImage(req.file);

    const doctor = await Doctor.create({
      name: req.body.name,
      designation: req.body.designation,
      qualification: req.body.qualification,
      specialization: req.body.specialization,
      experience: Number(req.body.experience) || 0,
      about: req.body.about,
      timings: req.body.timings,
      phone: req.body.phone,
      email: req.body.email,
      status: req.body.status || "active",
      image: imageUrl,
    });

    res.status(201).json({ success: true, doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const { q, page = 1, limit = 10, status } = req.query;
    const query = {};

    if (q) {
      query.$or = [
        { name: { $regex: q, $options: "i" } },
        { specialization: { $regex: q, $options: "i" } },
        { designation: { $regex: q, $options: "i" } },
        { qualification: { $regex: q, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    const currentPage = Number(page);
    const pageSize = Number(limit);
    const total = await Doctor.countDocuments(query);
    const doctors = await Doctor.find(query)
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    res.json({
      doctors,
      total,
      totalPages: Math.ceil(total / pageSize),
      currentPage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const imageUrl = req.file ? await uploadImage(req.file) : doctor.image;

    doctor.name = req.body.name || doctor.name;
    doctor.designation = req.body.designation || doctor.designation;
    doctor.qualification = req.body.qualification || doctor.qualification;
    doctor.specialization = req.body.specialization || doctor.specialization;
    doctor.experience = Number(req.body.experience) || doctor.experience;
    doctor.about = req.body.about || doctor.about;
    doctor.timings = req.body.timings || doctor.timings;
    doctor.phone = req.body.phone || doctor.phone;
    doctor.email = req.body.email || doctor.email;
    doctor.status = req.body.status || doctor.status;
    doctor.image = imageUrl;

    await doctor.save();

    res.json({ success: true, doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await doctor.remove();

    res.json({ success: true, message: "Doctor deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
