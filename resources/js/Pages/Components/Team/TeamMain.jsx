import React, { useEffect } from "react";
import Calendar from "./CustomCalendar";
import AddMember from "./Member/AddMember";
import TeamSidebar from "./TeamSidebar";
import { usePage, Link } from "@inertiajs/react";

function Main({
    tasks = [],
    members = [],
    auth,
    errors,
    children,
    comments = [],
    slug
}) {
    const loggedInUser = auth.user.id;
    console.log('tasks:', tasks);
    const [openCommentBox, setOpenCommentBox] = React.useState(null);
    const [openInviteBox, setOpenInviteBox] = React.useState(null);
    const { flash } = usePage().props;
    const [selectedUserId, setSelectedUserId] = React.useState(loggedInUser);
    const [userTasks, setUserTasks] = React.useState(
        tasks
            .filter((task) => task.member_id === loggedInUser)
            .map((task) => ({
                ...task,
                comments: task.comments || [],
            }))
    );

    const handleOpenCommentBox = (userId) => {
        setSelectedUserId(userId);
        setUserTasks(
            tasks
                .filter((task) => task.member_id === userId)
                .map((task) => ({
                    ...task,
                    comments: task.comments || [],
                }))
        );
    };

    const handleOpenInviteBox = () => {
        setOpenInviteBox(true);
    };

    console.log("First comment's user:", comments[0]?.user);

    const handleCloseCommentBox = () => {
        setOpenCommentBox(false);
    };

    useEffect(() => {
        if (flash.success) {
            alert(flash.success); 
        }
    }, [flash.success]);

    return (
        <>
            <div className="flex h-screen bg-slate-950 overflow-hidden font-['Poppins',sans-serif]">
                <TeamSidebar slug={slug} />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-white/10 px-4 py-2">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl font-medium bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                                Calendar for {auth.user.name}
                            </h1>

                            <div className="flex items-center space-x-4">
                                <div className="dropdown">
                                    <a
                                        className="btn flex items-center gap-2 dropdown-toggle bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-300"
                                        href="#"
                                        role="button"
                                        id="dropdownMenuLink"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                        {members.find(
                                            (user) => user.id === selectedUserId
                                        )?.name || auth.user.name}
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </a>

                                    <ul
                                        className="dropdown-menu bg-slate-800 border border-white/10 rounded-lg shadow-lg py-2 mt-1"
                                        aria-labelledby="dropdownMenuLink"
                                    >
                                        {members &&
                                            members.map((user) => (
                                                <li key={user.id}>
                                                    <a
                                                        onClick={() =>
                                                            handleOpenCommentBox(
                                                                user.id
                                                            )
                                                        }
                                                        className={`dropdown-item px-4 py-2 hover:bg-white/5 text-slate-300 hover:text-white flex items-center ${
                                                            auth.user &&
                                                            auth.user.id ===
                                                                user.id
                                                                ? "bg-blue-500/10 text-blue-300"
                                                                : ""
                                                        }`}
                                                        
                                                    >
                                                        
                                                        {user.name}
                                                    </a>
                                                </li>
                                            ))}

                                        <li>
                                            <button
                                                onClick={handleOpenInviteBox}
                                                className="w-full text-left px-4 py-2 hover:bg-white/5 text-slate-300 hover:text-white flex items-center"
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 4v16m8-8H4"
                                                    />
                                                </svg>
                                                Add Member
                                            </button>
                                        </li>
                                        <li className="border-t border-white/5 mt-1 pt-1">
                                            <Link
                                                href={route("logout")}
                                                method="post"
                                                className="dropdown-item px-4 py-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 flex items-center"
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                    />
                                                </svg>
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-900/80 via-slate-900 to-blue-900/20">
                        {openInviteBox && (
                            <AddMember
                                errors={errors}
                                flash={flash}
                                onClose={() => setOpenInviteBox(false)}
                            />
                        )}

                        
                            <Calendar
                                tasks={userTasks}
                                loggedInUser={auth.user.id}
                                selectedUser={selectedUserId}
                                users={members}
                                errors={errors}
                                flash={flash}
                                comments={comments}
                            />
                        
                    </main>
                </div>
            </div>
        </>
    );
}

export default Main;