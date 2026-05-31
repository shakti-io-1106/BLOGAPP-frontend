import { useState } from "react";
import API from "../services/api";

const CommentSection = ({
    postId,
    comments,
    refreshComments,
}) => {
    const [content, setContent] =
        useState("");

    const token =
        localStorage.getItem("token");

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    );

    const submitComment = async (e) => {
        e.preventDefault();

        if (!content.trim()) return;

        try {
            await API.post(
                `/comments/${postId}`,
                { content }
            );

            setContent("");

            refreshComments();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to add comment"
            );
        }
    };

    const deleteComment = async (commentId) => {
        try {
            await API.delete(
                `/comments/delete/${commentId}`
            );

            refreshComments();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">
                Comments
            </h2>

            {token && (
                <form
                    onSubmit={submitComment}
                    className="mb-6"
                >
                    <textarea
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                        placeholder="Write a comment..."
                        className="w-full border p-3 rounded"
                    />

                    <button
                        type="submit"
                        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Add Comment
                    </button>
                </form>
            )}

            <div className="space-y-4">
                {comments.map((comment) => (
                    <div
                        key={comment._id}
                        className="border rounded p-2"
                    >
                        <p className="text-sm text-gray-400 mt-2">
                            {comment.author.username}
                        </p>
                        <p>{comment.content}</p>
                        {currentUser?.id === comment.author._id && (
                            <button
                                onClick={() => deleteComment(comment._id)}
                                className="border rounded bg-red-500 text-white p-0.5 "
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;