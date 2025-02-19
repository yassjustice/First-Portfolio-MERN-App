import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "./conmponents/Shared/button";
import ThemeContext from "./context/ThemeContext";
import Dashboard from "./pages/BackOffice/Dashboard";
import AppRoutes from "./routes";

function App() {
    const [count, setCount] = useState(0);

    const [isDark, setIsDark] = useState(false);

    // const handleThemeToggle = () => {
    //   setIsDark(!isDark);
    //   document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
    // };

    const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggle from ThemeContext

    useEffect(() => {
        if (theme === "light") {
            setIsDark(!isDark);
        }
    }, [theme]);

    return (
        <div className={`app ${theme}`}>
            <AppRoutes />
        </div>
    );
}

export default App;
