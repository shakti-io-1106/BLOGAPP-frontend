import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import CommentSection from "../components/CommentSection";

const PostDetails = () => {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [comments, setComments] =
        useState([]);

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    );

    const isAuthor =
        currentUser?.id === post?.author?._id;

    const fetchPost = async () => {
        try {
            const res = await API.get(
                `/posts/${id}`
            );

            setPost(res.data.post);
            setComments(
                res.data.comments || []
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    if (!post) {
        return (
            <h2 className="p-6">
                Loading...
            </h2>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">

            <h1 className="text-4xl font-bold mb-4">
                {post.title}
            </h1>

            <p className="text-gray-500 mb-6">
                By {post.author.username}
            </p>
            <div className="whitespace-pre-wrap mb-10">
                {post.content}
            </div>
            {isAuthor && (
                <div className="mb-6">
                    <Link
                        to={`/edit/${post._id}`}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Edit Post
                    </Link>
                </div>
            )}



            <hr className="mb-6" />

            <CommentSection
                postId={id}
                comments={comments}
                refreshComments={fetchPost}
            />
        </div>
    );
};

export default PostDetails;