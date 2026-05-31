import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchPosts = async () => {
        try {
            const res = await API.get("/posts");
            setPosts(res.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) {
        return <h2 className="p-6">Loading...</h2>;
    }

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Latest Blog Posts
            </h1>
            <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border p-3 rounded mb-6"
            />
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                <div className="space-y-4">

                    {filteredPosts.map((post) => (
                        <Link
                            to={`/post/${post._id}`}
                            key={post._id}
                            // className="border rounded-lg p-4 shadow"
                            className="block border rounded p-2"
                        >
                            <h2 className="text-xl font-semibold">
                                {post.title}
                            </h2>

                            <p className="text-gray-600 mt-2">
                                {post.content.slice(0, 150)}
                                {post.content.length > 150 && "..."}
                            </p>

                            <p className="mt-3 text-sm text-gray-500">
                                By {post.author?.username}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;