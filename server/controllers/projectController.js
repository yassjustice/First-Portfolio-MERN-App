import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

// @desc    Get all projects
// @route   GET /api/projects
// @access  Protected
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single project by ID
// @route   GET /api/projects/:id
// @access  Protected
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Protected

export const createProject = async (req, res) => {
  try {
    console.log("✅ Create request received!");
    console.log("➡ Headers:", req.headers);
    console.log("➡ Request body:", req.body);
    console.log("➡ Uploaded file:", req.file || "❌ No file uploaded");

    const { title, description, tags, githubLink, demoLink } = req.body;

    if (!req.file || !req.file.buffer) {
      console.error("❌ No file uploaded! Check frontend and multer setup.");
      return res.status(400).json({ message: "Image is required!" });
    }

    // ✅ Upload image to Cloudinary
    let imageUrl;
    try {
      imageUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "projects" },
          (error, result) => {
            if (error) {
              console.error("❌ Cloudinary upload failed:", error);
              return reject(new Error("Cloudinary upload failed"));
            }
            console.log("✅ Image uploaded successfully:", result.secure_url);
            resolve(result.secure_url);
          }
        ).end(req.file.buffer);
      });
    } catch (uploadError) {
      console.error("❌ Error uploading image:", uploadError);
      return res.status(500).json({ message: "Error uploading image" });
    }

    // ✅ Ensure `tags` is properly handled as an array
    const tagsArray = Array.isArray(tags) ? tags : tags?.split(",").map(tag => tag.trim()) || [];

    console.log("✅ Creating new project in database...");
    const project = new Project({
      title,
      description,
      image: imageUrl,
      tags: tagsArray, // ✅ Store tags properly as an array
      githubLink,
      demoLink,
    });

    const newProject = await project.save();

    console.log("✅ Project saved successfully:", newProject);
    res.status(201).json(newProject);
  } catch (error) {
    console.error("❌ Error in createProject:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Protected

export const updateProject = async (req, res) => {
  try {
    console.log("✅ Update request received!");
    console.log("➡ Headers:", req.headers);
    console.log("➡ Request body:", req.body);
    console.log("➡ Uploaded file:", req.file || "❌ No file uploaded");

    const project = await Project.findById(req.params.id);
    if (!project) {
      console.error("❌ Project not found!");
      return res.status(404).json({ message: "Project not found" });
    }

    let imageUrl = project.image;

    // ✅ Upload new image to Cloudinary if a new file is provided
    if (req.file && req.file.buffer) {
      try {
        imageUrl = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "projects" },
            (error, result) => {
              if (error) {
                console.error("❌ Cloudinary upload failed:", error);
                return reject(new Error("Cloudinary upload failed"));
              }
              console.log("✅ Image uploaded successfully:", result.secure_url);
              resolve(result.secure_url);
            }
          ).end(req.file.buffer);
        });
      } catch (uploadError) {
        console.error("❌ Error uploading image:", uploadError);
        return res.status(500).json({ message: "Error uploading image" });
      }
    }

    // ✅ Ensure `tags` is properly handled as an array
    const tagsArray = Array.isArray(req.body.tags)
      ? req.body.tags
      : req.body.tags?.split(",").map(tag => tag.trim()) || project.tags;

    console.log("✅ Updating project in database...");

    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.image = imageUrl;
    project.tags = tagsArray;
    project.githubLink = req.body.githubLink || project.githubLink;
    project.demoLink = req.body.demoLink || project.demoLink;

    const updatedProject = await project.save();

    console.log("✅ Project updated successfully:", updatedProject);
    res.json(updatedProject);
  } catch (error) {
    console.error("❌ Error in updateProject:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Protected
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    // Delete associated image from Cloudinary if exists
    if (project.image) {
      const imageUrlParts = project.image.split("/");
      const imagePublicId = imageUrlParts[imageUrlParts.length - 1].split(".")[0]; // Extract public_id safely
      await cloudinary.uploader.destroy(`projects/${imagePublicId}`);
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

