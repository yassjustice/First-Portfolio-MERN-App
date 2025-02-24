// services/projectService.js
import api from "./apiService";

// Get all projects
export const getProjects = () => {
  return api.get("/projects");
};

// Get a single project by ID
export const getProjectById = (projectId) => {
  return api.get(`/projects/${projectId}`);
};

// Create a new project
// export const createProject = (projectData) => {
//   return api.post("/projects", projectData);
// };
export const createProject = (projectData) => {
  return api.post("/projects", projectData, {
    headers: {
      "Content-Type": "multipart/form-data", // ✅ Override default JSON header
    },
  });
};


// Update an existing project
export const updateProject = (projectId, updatedData) => {
  return api.put(`/projects/${projectId}`, updatedData);
};

// Delete a project
export const deleteProject = (projectId) => {
  return api.delete(`/projects/${projectId}`);
};

// Search projects by title (client-side filtering is recommended for efficiency)
export const searchProjects = async (query) => {
  const { data } = await getProjects();
  return data.filter((project) =>
    project.title.toLowerCase().includes(query.toLowerCase())
  );
};

// Sort projects (ascending or descending by title)
export const sortProjects = async (order = "asc") => {
  const { data } = await getProjects();
  return data.sort((a, b) => {
    return order === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });
};
