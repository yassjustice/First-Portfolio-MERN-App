import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

const PrivateRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <p>Loading...</p>; // Prevent redirecting while loading
    }

    return user ? <Outlet /> : <Navigate to="/loginpage" />;
};

export default PrivateRoute;
