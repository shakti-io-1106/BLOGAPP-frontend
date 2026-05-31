import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchPosts = async () => {
        try {
            const res = await API.get("/posts");

            const myPosts = res.data.filter(
                (post) => post.author?._id === user?.id
            );

            setPosts(myPosts);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const deletePost = async (id) => {
        if (!window.confirm("Delete this post?")) return;

        try {
            await API.delete(`/posts/${id}`);

            setPosts(posts.filter((p) => p._id !== id));
        } catch (error) {
            alert("Failed to delete post");
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between mb-6">
                <h1 className="text-3xl font-bold">My Posts</h1>

                <Link
                    to="/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    New Post
                </Link>
            </div>

            {posts.map((post) => (
                <div
                    key={post._id}
                    className="border rounded p-4 mb-4"
                >
                    <h2 className="font-bold text-xl">
                        {post.title}
                    </h2>

                    <div className="flex gap-3 mt-3">
                        <Link
                            to={`/edit/${post._id}`}
                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                            Edit
                        </Link>

                        <button
                            onClick={() => deletePost(post._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;