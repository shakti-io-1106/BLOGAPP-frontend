import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] =
        useState("");
    const [loading, setLoading] = useState(false);

    const { login } =
        useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await API.post(
                "/auth/login",
                {
                    email,
                    password,
                }
            );

            login(
                res.data.token,
                res.data.user
            );

            navigate("/");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-slate-100 ">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl space-y-5"
                >
                    <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white">
                        Login
                    </h2>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default Login;