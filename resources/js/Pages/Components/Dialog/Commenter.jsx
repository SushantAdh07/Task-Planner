import { useForm, usePage, router } from "@inertiajs/react";
import { comment } from "postcss";
import { useState, useEffect } from "react";

export default function Commenter({
    initialComments = [],
    loggedInUser,
    selectedUser,
    taskId,
}) {
    const { flash } = usePage().props;
    const [comments, setComments] = useState(initialComments);
    const [deletingID, setDeletingID] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        comment: "",
    });

    useEffect(() => {
        if (
            flash.newComment &&
            flash.newComment.task_id === taskId &&
            !comments.some((c) => c.id === flash.newComment.id)
        ) {
            setComments((prev) => [...prev, flash.newComment]);
        }
    }, [flash.newComment, taskId, comments]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/tasks/${taskId}/comments`, {
            preserveScroll: true,
            onSuccess: () => setData("comment", ""),
        });
    };

    const destroy = (commentId) => {
        setDeletingID(commentId);
        router.delete(route("comment.delete", commentId), {
            preserveScroll: true,
            onSuccess: () => {
                setComments((prev) =>
                    prev.filter((comment) => comment.id !== commentId)
                );
            },
            onFinish: () => setDeletingID(null),
        });
    };

    

    return (
        <div className="comment-section mt-4">
            <p>
                <strong>Comments</strong>{" "}
                <span className="text-sm text-blue-600">
                    ({comments.length})
                </span>
            </p>

            {comments.length > 0 ? (
                <div className="comment-list mt-2">
                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="comment-card mb-3 p-3 bg-blue-50 rounded"
                        > 
                        
                            <div className="comment-header d-flex justify-content-between align-items-center mb-2">
                                <strong>{comment.user?.name}</strong>
                                <small className="text-muted">
                                    {new Date(
                                        comment.created_at
                                    ).toLocaleString()}
                                </small>
                            </div>
                            <div className="flex justify-between items-center comment-body">
                                <p className="mb-0">{comment.comment}</p>
                                {loggedInUser === comment.user.id && (
                                    <button
                                        onClick={() => destroy(comment.id)}
                                        className="text-sm text-red-700"
                                        disabled={deletingID == comment.id}
                                    >
                                        {deletingID == comment.id
                                            ? "Deleting..."
                                            : "Delete"}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted">No comments yet</p>
            )}

            {loggedInUser === selectedUser ? null : (
                <form onSubmit={handleSubmit} className="mt-3">
                    <div className="form-group">
                        <textarea
                            className={`form-control ${
                                errors.comment ? "is-invalid" : ""
                            }`}
                            value={data.comment}
                            onChange={(e) => setData("comment", e.target.value)}
                            placeholder="Add a comment..."
                            rows="3"
                            required
                        />
                        {errors.comment && (
                            <div className="invalid-feedback">
                                {errors.comment}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white mt-2 px-4 py-2 rounded-lg hover:bg-blue-800"
                        disabled={processing}
                    >
                        {processing ? "Posting..." : "Post Comment"}
                    </button>
                </form>
            )}
        </div>
    );
}
