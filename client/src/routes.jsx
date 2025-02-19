import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/BackOffice/Dashboard";
import Home from "./pages/FrontOffice/Home";
// import Home from "./pages/FrontOffice/Home"; // Example home page
// import Projects from "./pages/FrontOffice/Projects";
// import About from "./pages/FrontOffice/About";
// import NotFound from "./pages/Shared/NotFound";
// import PrivateRoute from "./components/Shared/PrivateRoute"; // Protects back office routes

const AppRoutes = () => {
    return (
        <Routes>
            {/* Front Office Routes */}
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/" element={<Home />} />
            {/* <Route path="/projects" element={<Projects />} /> */}
            {/* <Route path="/about" element={<About />} /> */}

            {/* Back Office Routes - Protected */}
            {/* <Route path="/backoffice/*" element={<PrivateRoute />}> */}
                {/* <Route path="dashboard" element={<Dashboard />} /> */}
                {/* Add more back office routes here */}
            {/* </Route> */}

            {/* 404 Page */}
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    );
};

export default AppRoutes;
