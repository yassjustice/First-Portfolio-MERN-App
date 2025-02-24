import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { formatDate } from "../../utils/formatDate";
import Card from "../../conmponents/Shared/Card";
import { getProjects } from "../../services/projectService";
import { getUserData } from "../../services/userService";
import AuthContext from "../../context/AuthContext";
import UserContext from "../../context/UserContext";
import styles from "./Dashboard.module.css";

const Dashboard = ({ title }) => {
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

                // Ensure projectsData and usersData are arrays, or default to an empty array
                setProjects(Array.isArray(projectsData) ? projectsData : []);
                setUsers(Array.isArray(usersData) ? usersData : []);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
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
        return count && count > 0 ? (
            <Card
                title={label}
                count={count}
                onClick={() => handleNavigate(label.toLowerCase())}
            />
        ) : (
            <div>{`No ${label} available.`}</div>
        );
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboardContent}>
                <div className={styles.dashboardOverview}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {renderCardData("Projects", projects.length)}
                            {renderCardData("Users", users.length)}
                        </>
                    )}
                </div>

                <div className={styles.dashboardRecent}>
                    <h2 className={styles.recentHeader}>Recent Activity</h2>
                    <div className={styles.recentList}>
                        <div>
                            <h3>Recent Projects</h3>
                            <ul>
                                {Array.isArray(projects) &&
                                projects.length > 0 ? (
                                    projects.slice(0, 5).map((project) => (
                                        <li key={project._id}>
                                            <strong>{project.title}</strong> -
                                            Created on{" "}
                                            {formatDate(
                                                project.createdAt,
                                                "long"
                                            )}
                                        </li>
                                    ))
                                ) : (
                                    <li>No recent projects available.</li>
                                )}
                            </ul>
                        </div>

                        <div>
                            <h3>Recent Users</h3>
                            <ul>
                                {Array.isArray(users) && users.length > 0 ? (
                                    users.slice(0, 5).map((user) => (
                                        <li key={user._id}>
                                            <strong>{user.username}</strong> -
                                            Joined on{" "}
                                            {formatDate(user.createdAt, "long")}
                                        </li>
                                    ))
                                ) : (
                                    <li>No recent users available.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
