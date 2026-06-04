import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { useState } from "react";

const ChangePassword = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        newPassword: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.put(`/account/updatepassword/${id}`, formData);

            // <Navigate to='/dashboard' />
            navigate('/dashboard');
        } catch (error) {
            return alert(
                error.response?.data?.message ||
                "Password Changing Failed"
            );
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 ">
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl space-y-5"
            >
                <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white">
                    Change Password
                </h2>

                <div>
                    <label className="block mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                        Username
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        onChange={(e) => setFormData(
                            {
                                ...formData,
                                username: e.target.value
                            }
                        )}
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
                        onChange={(e) => setFormData({
                            ...formData,
                            password: e.target.value
                        })}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                        New Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter your New password"
                        onChange={(e) => setFormData({
                            ...formData,
                            newPassword: e.target.value
                        })}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200"
                >
                    Change
                </button>
            </form>
        </div>
    )
}

export default ChangePassword;