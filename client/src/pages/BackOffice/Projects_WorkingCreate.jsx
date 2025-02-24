import { useEffect, useState } from "react";
import {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
} from "../../services/projectService";
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
    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        tags: [],
        githubLink: "",
        demoLink: "",
    });
    const [editingProject, setEditingProject] = useState(null);
    const [imageFile, setImageFile] = useState(null);

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
        newProject.tags.forEach(tag => formData.append("tags", tag));
    
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
        const filtered = projects.filter(project => 
            project.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProjects(filtered);
    };

    const handleSort = () => {
        const sorted = [...filteredProjects].sort((a, b) => {
            return sortOrder === "asc" 
                ? a.title.localeCompare(b.title) 
                : b.title.localeCompare(a.title);
        });
        setFilteredProjects(sorted);
    };

    useEffect(() => {
        handleSearch();
        handleSort();
    }, [searchTerm, sortOrder, projects]);

    return (
        <div className={styles.projectsContainer}>
            <h1>Projects</h1>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.controls}>
                <InputField
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search projects..."
                />
                <Button onClick={handleSort}>
                    {sortOrder === "asc" ? "Sort Desc" : "Sort Asc"}
                </Button>
                <Button onClick={() => setModalOpen(true)}>
                    + Add Project
                </Button>
            </div>
            <div className={styles.projectsList}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    filteredProjects.map((project) => (
                        <Card key={project._id}>
                            <img
                                src={project.image}
                                alt={project.title}
                                className={styles.projectImage}
                            />
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <p>Tags: {project.tags.join(", ")}</p>
                            <div className={styles.projectLinks}>
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
                                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">Live Demo</a>
                            </div>
                            <Button onClick={() => {
                                setEditingProject(project);
                                setNewProject(project);
                                setModalOpen(true);
                            }}>Edit</Button>
                            <Button onClick={() => handleDeleteProject(project._id)}>Delete</Button>
                        </Card>
                    ))
                )}
            </div>
            {modalOpen && (
                <Modal
                    isOpen={modalOpen}
                    onClose={resetForm}
                    title={editingProject ? "Edit Project" : "New Project"}
                >
                    <div className={styles.modalContent}>
                        <div className={styles.modalBody}>
                            <InputField type="text" value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})} placeholder="Project Title" />
                            <InputField type="text" value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})} placeholder="Project Description" />
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => setImageFile(e.target.files[0])} 
                                className={styles.fullWidth} 
                            />
                            <InputField 
                                type="text" 
                                value={newProject.tags.join(", ")} 
                                onChange={(e) => setNewProject({...newProject, tags: e.target.value.split(",").map(tag => tag.trim())})} 
                                placeholder="Tags (comma-separated)" 
                            />
                            <InputField 
                                type="text" 
                                value={newProject.githubLink} 
                                onChange={(e) => setNewProject({...newProject, githubLink: e.target.value})} 
                                placeholder="GitHub Link" 
                            />
                            <InputField 
                                type="text" 
                                value={newProject.demoLink} 
                                onChange={(e) => setNewProject({...newProject, demoLink: e.target.value})} 
                                placeholder="Live Demo Link" 
                                className={styles.fullWidth} 
                            />
                            <Button className={styles.fullWidth} onClick={handleCreateOrUpdateProject}>
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
