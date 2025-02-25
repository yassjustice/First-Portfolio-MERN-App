import React, { useEffect, useState } from "react";
import {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
} from "../../services/projectService";
import { Grid, List, LayoutGrid } from "lucide-react";
import styles from "./Projects.module.css";
import Card from "../../conmponents/Shared/Card";
import Button from "../../conmponents/Shared/button";
import InputField from "../../conmponents/Shared/InputField";
import Modal from "../../conmponents/Shared/Modal";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [modalOpen, setModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState(() => {
        return localStorage.getItem("viewMode") || "grid";
    });
    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        tags: [],
        githubLink: "",
        demoLink: "",
    });
    const [editingProject, setEditingProject] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    // ... Keep existing fetchProjects, handleCreateOrUpdateProject, resetForm,
    // handleDeleteProject, handleSearch, handleSort, and related useEffects ...

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await getProjects();
            setProjects(response.data);
            setFilteredProjects(response.data);
        } catch (err) {
            setError("Failed to fetch projects");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrUpdateProject = async () => {
        const formData = new FormData();
        formData.append("title", newProject.title);
        formData.append("description", newProject.description);
        formData.append("githubLink", newProject.githubLink);
        formData.append("demoLink", newProject.demoLink);

        // ✅ Fix: Ensure correct array format for tags
        newProject.tags.forEach((tag) => formData.append("tags", tag));

        // ✅ Fix: Ensure file is appended correctly
        if (imageFile) {
            formData.append("image", imageFile);
        } else if (editingProject) {
            formData.append("image", editingProject.image);
        }
        console.log([...formData]); // ✅ Debug FormData content before sending
        try {
            if (editingProject) {
                await updateProject(editingProject._id, formData);
            } else {
                await createProject(formData);
            }
            resetForm();
            fetchProjects();
        } catch (err) {
            setError("Failed to save project");
            console.error(err);
        }
    };

    const resetForm = () => {
        setModalOpen(false);
        setEditingProject(null);
        setImageFile(null);
        setNewProject({
            title: "",
            description: "",
            tags: [],
            githubLink: "",
            demoLink: "",
        });
    };

    const handleDeleteProject = async (id) => {
        try {
            await deleteProject(id);
            fetchProjects();
        } catch (err) {
            setError("Failed to delete project");
        }
    };

    const handleSearch = () => {
        const filtered = projects.filter((project) =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProjects(filtered);
    };

    const handleSort = () => {
        console.log("Sorting triggered! Current order:", sortOrder);
        const sorted = [...filteredProjects].sort((a, b) => {
            return sortOrder === "asc"
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title);
        });
        setFilteredProjects(sorted);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
    };
    

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
        localStorage.setItem("viewMode", mode);
    };

    useEffect(() => {
        const savedViewMode = localStorage.getItem("viewMode");
        if (savedViewMode) {
            setViewMode(savedViewMode);
        }
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchTerm, projects]);
    

    const ProjectCard = ({ project }) => (
        <Card className={styles.projectCard}>
            <div className={styles.thumbnailContainer}>
                <img
                    src={project.image}
                    alt={project.title}
                    className={styles.thumbnail}
                />
            </div>
            <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>
                    {project.description}
                </p>
                <div className={styles.tags}>
                    {project.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>
                            {tag}
                        </span>
                    ))}
                </div>
                <div className={styles.projectLinks}>
                    <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        GitHub
                    </a>
                    <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        Live Demo
                    </a>
                </div>
                <div className={styles.actionButtons}>
                    <Button
                        className={styles.editButton}
                        onClick={() => {
                            setEditingProject(project);
                            setNewProject(project);
                            setModalOpen(true);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteProject(project._id)}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </Card>
    );

    const ProjectTableRow = ({ project }) => (
        <tr className={styles.tableRow}>
            <td className={styles.tableCell}>
                <img
                    src={project.image}
                    alt={project.title}
                    className={styles.tableThumbnail}
                />
            </td>
            <td className={styles.tableCell}>{project.title}</td>
            <td className={styles.tableCell}>{project.description}</td>
            <td className={styles.tableCell}>
                <div className={styles.tags}>
                    {project.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>
                            {tag}
                        </span>
                    ))}
                </div>
            </td>
            <td className={styles.tableCell}>
                <div className={styles.tableActions}>
                    <Button
                        className={styles.editButton}
                        onClick={() => {
                            setEditingProject(project);
                            setNewProject(project);
                            setModalOpen(true);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteProject(project._id)}
                    >
                        Delete
                    </Button>
                </div>
            </td>
        </tr>
    );

    return (
        <div className={styles.projectsContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Projects</h1>
                <div className={styles.viewControls}>
                    <Button
                        className={`${styles.viewButton} ${
                            viewMode === "grid" ? styles.active : ""
                        }`}
                        onClick={() => handleViewModeChange("grid")}
                    >
                        <LayoutGrid size={20} />
                    </Button>
                    <Button
                        className={`${styles.viewButton} ${
                            viewMode === "list" ? styles.active : ""
                        }`}
                        onClick={() => handleViewModeChange("list")}
                    >
                        <List size={20} />
                    </Button>
                </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <InputField
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..."
                className={styles.searchInput}
            />
            <div className={styles.controls}>
                <Button
                    onClick={() => handleSort()}
                    className={styles.sortButton}
                >
                    {sortOrder === "asc" ? "Sort Desc" : "Sort Asc"}
                </Button>

                <Button
                    onClick={() => setModalOpen(true)}
                    className={styles.addButton}
                >
                    + Add Project
                </Button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : viewMode === "grid" ? (
                <div className={styles.projectGrid}>
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.projectTable}>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Tags</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProjects.map((project) => (
                                <ProjectTableRow
                                    key={project._id}
                                    project={project}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {modalOpen && (
                <Modal
                    isOpen={modalOpen}
                    onClose={resetForm}
                    title={editingProject ? "Edit Project" : "New Project"}
                >
                    <div className={styles.modalContent}>
                        <div className={styles.modalBody}>
                            <InputField
                                type="text"
                                value={newProject.title}
                                onChange={(e) =>
                                    setNewProject({
                                        ...newProject,
                                        title: e.target.value,
                                    })
                                }
                                placeholder="Project Title"
                            />
                            <InputField
                                type="text"
                                value={newProject.description}
                                onChange={(e) =>
                                    setNewProject({
                                        ...newProject,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Project Description"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setImageFile(e.target.files[0])
                                }
                                className={styles.fullWidth}
                            />
                            <InputField
                                type="text"
                                value={newProject.tags.join(", ")}
                                onChange={(e) =>
                                    setNewProject({
                                        ...newProject,
                                        tags: e.target.value
                                            .split(",")
                                            .map((tag) => tag.trim()),
                                    })
                                }
                                placeholder="Tags (comma-separated)"
                            />
                            <InputField
                                type="text"
                                value={newProject.githubLink}
                                onChange={(e) =>
                                    setNewProject({
                                        ...newProject,
                                        githubLink: e.target.value,
                                    })
                                }
                                placeholder="GitHub Link"
                            />
                            <InputField
                                type="text"
                                value={newProject.demoLink}
                                onChange={(e) =>
                                    setNewProject({
                                        ...newProject,
                                        demoLink: e.target.value,
                                    })
                                }
                                placeholder="Live Demo Link"
                                className={styles.fullWidth}
                            />
                            <Button
                                className={styles.fullWidth}
                                onClick={handleCreateOrUpdateProject}
                            >
                                {editingProject ? "Update" : "Create"}
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Projects;
