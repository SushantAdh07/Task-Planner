import React from "react";
import Calendar from "./CustomCalendar";
import Sidebar from "./Sidebar";
import Commenter from "./Dialog/Commenter";

function Main({ tasks = [], users = [], auth }) {
    const loggedInUser = auth.user.id;
    const [openCommentBox, setOpenCommentBox] = React.useState(null);
    const [selectedUserId, setSelectedUserId] = React.useState(loggedInUser); // State for selected user
    const [userTasks, setUserTasks] = React.useState(
        tasks.filter((task) => task.user_id === loggedInUser)
    ); // State for tasks of the selected user

    // Handle when a user is clicked in the dropdown
    const handleOpenCommentBox = (userId) => {
        setSelectedUserId(userId);
        setUserTasks(tasks.filter((task) => task.user_id === userId));
    };

    // Close the comment box
    const handleCloseCommentBox = () => {
        setOpenCommentBox(false);
    };

    return (
        <>
            <div className="container p-3 main">
                {/** <div className="col-md-4 mt-3 bg-dark sidebar">
                    <Sidebar />
                </div> */}
                <div className="col-md-12 mx-auto">
                    <span className="menu-name">
                        <h2 className="menu-name-1">
                            Calendar for {auth.user.name}
                        </h2>
                        <div className="dropdown">
                            <a
                                className="btn dropdown-toggle neutralButton"
                                href="#"
                                role="button"
                                id="dropdownMenuLink"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {users.find(
                                    (user) => user.id === selectedUserId
                                )?.name || auth.user.name}
                            </a>

                            <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuLink"
                            >
                                {users &&
                                    users.map((user) => (
                                        <li key={user.id}>
                                            <a
                                                onClick={() =>
                                                    handleOpenCommentBox(
                                                        user.id
                                                    )
                                                } // Pass user ID
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                {user.name}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </span>

                    {/* Pass tasks of the selected user to the Calendar component */}
                    <Calendar
                        tasks={userTasks}
                        loggedInUser={auth.user.id}
                        selectedUser={selectedUserId}
                        users={users}
                    />
                </div>
            </div>
        </>
    );
}

export default Main;
