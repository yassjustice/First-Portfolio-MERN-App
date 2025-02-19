import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { formatDate } from "../../utils/formatDate";
import Card from "../../conmponents/Shared/Card";
import Sidebar from "../../conmponents/BackOffice/SideBar";
import Header from "../../conmponents/BackOffice/Header";
import { getProjects } from "../../services/projectService";
import { getUserData } from "../../services/userService";
import AuthContext from "../../context/AuthContext";
import UserContext from "../../context/UserContext";
import { useContext } from "react";

const Dashboard = () => {
    const { userProfile, setUserProfile } = useContext(UserContext);
    const { user, token, login, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data for projects and users when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const projectsData = await getProjects(token);
                const usersData = await getUserData(token);
                setProjects(projectsData);
                setUsers(usersData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    // Navigate to specific project or user management page
    const handleNavigate = (type) => {
        navigate(`/backoffice/${type}`);
    };

    // Function to render data or loading states
    const renderCardData = (label, count) => {
        return count > 0 ? (
            <Card
                title={label}
                count={count}
                onClick={() => handleNavigate(label.toLowerCase())}
            />
        ) : (
            <div>No {label} available.</div>
        );
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-content">
                <Header title="Dashboard" />

                <div className="dashboard-overview">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {renderCardData("Projects", projects.length)}
                            {renderCardData("Users", users.length)}
                            {/* More stats can be added here as needed */}
                        </>
                    )}
                </div>

                <div className="dashboard-recent">
                    <h2>Recent Activity</h2>
                    <div className="recent-list">
                        <div>
                            <h3>Recent Projects</h3>
                            <ul>
                                {projects.slice(0, 5).map((project) => (
                                    <li key={project._id}>
                                        <strong>{project.title}</strong> -
                                        Created on{" "}
                                        {formatDate(project.createdAt, "long")}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3>Recent Users</h3>
                            <ul>
                                {users.slice(0, 5).map((user) => (
                                    <li key={user._id}>
                                        <strong>{user.username}</strong> -
                                        Joined on{" "}
                                        {formatDate(user.createdAt, "long")}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
