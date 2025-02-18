// controllers/projectController.js
import Project from "../models/Project.js";

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
  const { title, description, image, tags, githubLink, demoLink } = req.body;
  try {
    const project = new Project({
      title,
      description,
      image,
      tags,
      githubLink,
      demoLink,
    });
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Protected
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update fields if they exist in the request body
    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.image = req.body.image || project.image;
    project.tags = req.body.tags || project.tags;
    project.githubLink = req.body.githubLink || project.githubLink;
    project.demoLink = req.body.demoLink || project.demoLink;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Protected
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    await project.remove();
    res.json({ message: "Project removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
