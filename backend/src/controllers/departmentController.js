import Department from "../models/Department.js";

const buildSlug = (title) =>
  title
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export const createDepartment = async (req, res) => {
  try {
    const slug = req.body.slug || buildSlug(req.body.title || "");

    const department = await Department.create({
      title: req.body.title,
      slug,
      image: req.body.image || "",
      description: req.body.description || "",
      status: req.body.status || "active",
    });

    res.status(201).json({ success: true, department });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const { q, page = 1, limit = 10, status } = req.query;
    const query = {};

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    const currentPage = Number(page);
    const pageSize = Number(limit);
    const total = await Department.countDocuments(query);
    const departments = await Department.find(query)
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    res.json({
      departments,
      total,
      totalPages: Math.ceil(total / pageSize),
      currentPage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    department.title = req.body.title || department.title;
    department.slug = req.body.slug || buildSlug(department.title);
    department.image = req.body.image || department.image;
    department.description = req.body.description || department.description;
    department.status = req.body.status || department.status;

    await department.save();

    res.json({ success: true, department });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    await department.remove();

    res.json({ success: true, message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
