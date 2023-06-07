import { Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('token');

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    window.location.href="/LoginForm"
                )
            }
        />
    );
};
export default PrivateRoute;