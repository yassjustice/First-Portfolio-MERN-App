import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/BackOffice/Dashboard";
import Home from "./pages/FrontOffice/Home";
import PrivateRoute from "./privateRoute";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import BackOfficeLayout from "./pages/BackOffice/BackOfficeLayout";
import Projects from "./pages/BackOffice/Projects";

// import Home from "./pages/FrontOffice/Home"; // Example home page
// import Projects from "./pages/FrontOffice/Projects";
// import About from "./pages/FrontOffice/About";
// import NotFound from "./pages/Shared/NotFound";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Front Office Routes */}
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/loginpage" element={<Auth />} />
            {/* <Route path="/projects" element={<Projects />} /> */}
            {/* <Route path="/about" element={<About />} /> */}

            {/* Back Office Routes - Protected */}
            <Route path="/backoffice/*" element={<PrivateRoute />}>
                <Route element={<BackOfficeLayout />}>
                    <Route
                        index
                        element={<Navigate to="dashboard" replace />}
                    />
                    <Route
                        path="dashboard"
                        element={<Dashboard/>}
                    />
                    <Route
                        path="projects"
                        element={<Projects/>}
                    />
                </Route>
                {/* Add more back office routes here */}
            </Route>

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
