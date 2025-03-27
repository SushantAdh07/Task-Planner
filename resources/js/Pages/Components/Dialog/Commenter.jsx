import { useState } from "react";

export default function Commenter({
    comments = [],
    loggedInUser,
    selectedUser,
}) {
    return (
        <>
            <h1>
                <strong>Comments</strong>
            </h1>
            <div className="comment-section mt-2">
                <div className="comment-card mb-3">
                    {loggedInUser === selectedUser ? (
                        comments.length > 0 ? (
                            <div>
                                <div className="comment-header d-flex align-items-center mb-2">
                                    <div className="user-info">
                                        <h6 className="mb-0">User</h6>
                                        <small className="text-muted">
                                            Date
                                        </small>
                                    </div>
                                </div>
                                <div className="comment-body bg-light p-3 rounded">
                                    <p className="mb-0">Comment</p>
                                </div>
                            </div>
                        ) : (
                            <p>No comments</p>
                        )
                    ) : (
                        <button className="btn btn-primary">Add Comment</button>
                    )}
                </div>
            </div>
        </>
    );
}
