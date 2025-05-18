import { useForm, usePage, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Commenter({
    initialComments = [],
    loggedInUser,
    selectedUser,
    taskId,
}) {
    const { flash } = usePage().props;
    const [comments, setComments] = useState(initialComments);
    const { data, setData, post, processing, errors } = useForm({
        comment: "",
    });

    useEffect(() => {
        if (
            flash.newComment &&
            flash.newComment.task_id === taskId // Ensure it belongs to this task
        ) {
            setComments((prev) => [...prev, flash.newComment]);
        }
    }, [flash.newComment, taskId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/tasks/${taskId}/comments`, {
            preserveScroll: true,
            onSuccess: () => setData("comment", ""),
        });
    };

    const destroy = () => {
        router.delete(route("comment.delete"));
    }

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
                                <p className="mb-0">{comment.comment}</p>
                            </div>
                            {}
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
