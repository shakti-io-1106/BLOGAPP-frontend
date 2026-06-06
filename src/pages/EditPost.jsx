import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({
            title: "",
            content: "",
        });
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
            const res = await API.get(
                `/posts/${id}`
            );

            setFormData({
                title: res.data.post.title,
                content: res.data.post.content,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdate(true);
        try {
            await API.put(
                `/posts/${id}`,
                formData
            );


            navigate("/dashboard");
        } catch (error) {
            alert("Failed to update post");
        } finally {
            setUpdate(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Edit Post
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <input
                    name="title"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            title: e.target.value,
                        })
                    }
                    className="w-full border p-3 rounded"
                />

                <textarea
                    rows="10"
                    value={formData.content}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            content: e.target.value,
                        })
                    }
                    className="w-full border p-3 rounded"
                />

                <button
                    className="bg-green-600 text-white px-6 py-3 rounded"
                    disabled={update}
                >
                    {update ? "Updating..." : "Update Post"}
                </button>
            </form>
        </div>
    );
};

export default EditPost;