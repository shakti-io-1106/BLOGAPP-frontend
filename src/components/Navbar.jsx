import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-gray-900 text-white px-6 py-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link
                    to="/"
                    className="text-2xl font-bold"
                >
                    Blog Platform
                </Link>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <span>
                                Hello,
                                <Link to={'/myaccount'}
                                    className="text-blue-400 font-semibold">
                                    {user.username}
                                </Link>
                            </span>
                            <Link
                                to="/dashboard"
                                className="bg-gray-700 px-3 py-2 rounded"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/create"
                                className="bg-blue-600 px-3 py-2 rounded"
                            >
                                Create Post
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="bg-red-600 px-3 py-2 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {location.pathname !== '/' && (
                                <Link to="/">
                                    Home
                                </Link>
                            )}
                            {location.pathname !== '/login' && location.pathname !== '/register' && (
                                <Link to="/login">
                                    Login
                                </Link>
                            )}

                            {location.pathname === '/register' || location.pathname !== '/login' && (
                                <Link to="/register">
                                    Register
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;