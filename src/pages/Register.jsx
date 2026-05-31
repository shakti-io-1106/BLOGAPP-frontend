import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            <input
                placeholder="Username"
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        username: e.target.value,
                    })
                }
            />

            <input
                placeholder="Email"
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        email: e.target.value,
                    })
                }
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        password: e.target.value,
                    })
                }
            />

            <button type="submit">
                Register
            </button>
        </form>
    );
}

export default Register;