import React from "react";
import Calendar from "./CustomCalendar";
import AddMember from "./AddMember";
import { usePage, Link } from "@inertiajs/react";

function Main({ tasks = [], members = [], auth, errors, children, comments = [] }) {
    const loggedInUser = auth.user.id;
    const [openCommentBox, setOpenCommentBox] = React.useState(null);
    const [openInviteBox, setOpenInviteBox] = React.useState(null);
    const { flash } = usePage().props;
    const [selectedUserId, setSelectedUserId] = React.useState(loggedInUser); 
    const [userTasks, setUserTasks] = React.useState(
        tasks
            .filter((task) => task.user_id === loggedInUser)
            .map((task) => ({
                ...task,
                comments: task.comments || [], 
            }))
    );

    const handleOpenCommentBox = (userId) => {
        setSelectedUserId(userId);
        setUserTasks(
            tasks
                .filter((task) => task.user_id === userId)
                .map((task) => ({
                    ...task,
                    comments: task.comments || [],
                }))
        );
    };

    const handleOpenInviteBox = () => {
        setOpenInviteBox(true);
    }

    console.log("First comment's user:", comments[0]?.user);

    const handleCloseCommentBox = () => {
        setOpenCommentBox(false);
    };

    return (
        <>
            <div className="container p-3 main">
                {/** <div className="col-md-4 mt-3 bg-dark sidebar">
                    <Sidebar />
                </div> */}

                <div className="flex justify-between items-center w-full">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 truncate max-w-[50%] sm:max-w-[70%]">
                        Calendar for {auth.user.name}
                    </h2>

                    <div className="dropdown ml-2">
                        <a
                            className="btn flex items-center gap-1 dropdown-toggle neutralButton hover:text-white"
                            href="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {members.find((user) => user.id === selectedUserId)
                                ?.name || auth.user.name}
                        </a>

                        <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuLink"
                        >
                            {members &&
                                members.map((user) => (
                                    
                                        <li key={user.id}>
                                        <a
                                            onClick={() =>
                                                handleOpenCommentBox(user.id)
                                            }
                                            className={`dropdown-item ${
                                                auth.user &&
                                                auth.user.id === user.id
                                                    ? "bg-gray-200 text-black"
                                                    : ""
                                            }`}
                                            href="#"
                                        >
                                            {user.name}
                                        </a>
                                    </li>
                                    
                                    
                                ))}
                                
                                <li onClick={handleOpenInviteBox}>Add Member</li>
                                <li><Link href={route("logout")} method="post" className="dropdown-item bg-blue-700 text-white hover:bg-blue-800">Logout</Link></li>
                                
                        </ul>
                    </div>
                </div>

                
                { openInviteBox && (
                    <AddMember onClose={() => setOpenInviteBox(false)}/>
                ) }

                <Calendar
                    tasks={userTasks}
                    loggedInUser={auth.user.id}
                    selectedUser={selectedUserId}
                    users={members}
                    errors={errors}
                    flash={flash}
                    comments={comments}
                />
            </div>
        </>
    );
}

export default Main;
