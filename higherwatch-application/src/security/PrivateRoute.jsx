import {Navigate, useLocation} from 'react-router-dom'

export function RequireAuth({ children }) {
    const isAuthenticated = localStorage.getItem("token"); // your logic here
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/loginForm" state={{ from: location }} />;
    }

    return children;
}
