// Commenter.jsx
import { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function Commenter({
    comments = [],
    loggedInUser,
    selectedUser,
    taskId,
}) {
    const { data, setData, post, processing } = useForm({
        content: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/tasks/${taskId}/comments`, {
            preserveScroll: true,
            onSuccess: () => setData("content", ""),
        });
    };

    return (
        <div className="comment-section mt-4">
            <h5>Comments ({comments.length})</h5>

            {comments.length > 0 ? (
                <div className="comment-list mt-2">
                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="comment-card mb-3 p-3 bg-light rounded"
                        >
                            <div className="comment-header d-flex justify-content-between align-items-center mb-2">
                                <strong>{comment.user?.name}</strong>
                                <small className="text-muted">
                                    {new Date(
                                        comment.created_at
                                    ).toLocaleString()}
                                </small>
                            </div>
                            <div className="comment-body">
                                <p className="mb-0">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted">No comments yet</p>
            )}

            {loggedInUser === selectedUser && (
                <form onSubmit={handleSubmit} className="mt-3">
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            placeholder="Add a comment..."
                            rows="3"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary mt-2"
                        disabled={processing}
                    >
                        {processing ? "Posting..." : "Post Comment"}
                    </button>
                </form>
            )}
        </div>
    );
}
