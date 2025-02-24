import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./BackOfficeLayout.module.css"; // Optional for styling
import Sidebar from "../../conmponents/BackOffice/SideBar";
import Header from "../../conmponents/BackOffice/Header";

const pageTitles = {
    "/backoffice/dashboard": "Dashboard",
    "/backoffice/projects": "Projects",
    "/backoffice/users": "Users",
    // Add more paths as needed
};

const BackOfficeLayout = () => {
    const location = useLocation();
    const title = pageTitles[location.pathname] || "Back Office"; // Default title

    return (
        <div className={styles.backofficeContainer}>
            <Sidebar />
            <div className={styles.contentArea}>
                <Header title={title} />
                <main className={styles.mainContent}>
                    <Outlet />{" "}
                    {/* This is where the back-office pages will be injected */}
                </main>
            </div>
        </div>
    );
};

export default BackOfficeLayout;
