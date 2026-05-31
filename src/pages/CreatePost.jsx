import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const CreatePost = () => {
    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({
            title: "",
            content: "",
        });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post(
                "/posts",
                formData
            );

            navigate("/");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to create post"
            );
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Create New Post
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <input
                    type="text"
                    name="title"
                    placeholder="Post Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <textarea
                    name="content"
                    placeholder="Write your post..."
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded"
                >
                    Publish
                </button>
            </form>
        </div>
    );
};

export default CreatePost;