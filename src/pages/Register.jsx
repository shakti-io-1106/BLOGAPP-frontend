import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({
            username: "",
            email: "",
            password: "",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post(
                "/auth/register",
                formData
            );

            navigate("/login");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-slate-100 ">
                <form
                    className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-xl space-y-5"
                    onSubmit={handleSubmit}>
                    <h2 className="text-3xl font-bold text-center text-white">Register</h2>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-300">Username</label>
                        <input
                            placeholder="Enter username"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    username: e.target.value,
                                })
                            }
                            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 text-white"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-300">Email</label>
                        <input
                            placeholder="Email"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700 border-slate-600 text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-300">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 border-slate-600 focus:border-transparent text-white"
                        />
                    </div>
                    <button type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200">
                        Register
                    </button>
                    <p
                        className="text-center text-sm text-slate-400"
                    >Already have an account?{" "}
                        <Link to="/login"
                            className="text-blue-500 hover:underline">Login</Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default Register;