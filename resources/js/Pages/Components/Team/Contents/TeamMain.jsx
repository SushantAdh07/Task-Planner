import React, { useEffect, useState } from "react";
import Calendar from "./CustomCalendar";
import AddMember from "../Member/AddMember";
import TeamSidebar from "../Components/TeamSidebar";
import Assignments from "./Assignments";
import { usePage, Link } from "@inertiajs/react";

function Main({
    tasks = [],
    members = [],
    auth,
    errors,
    comments = [],
    slug,
    selectedUserId: initialSelectedUserId,
}) {
    const loggedInUser = auth?.user?.id;
    const slugName = auth?.user?.name;
    const loggedInMemberId = auth?.memberId;
    
    const { flash } = usePage().props;

    const [openInviteBox, setOpenInviteBox] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(
        initialSelectedUserId || loggedInMemberId
    );
    useEffect(() => {
        if (flash?.success) {
            alert(flash.success);
        }
    }, [flash]);

    const handleOpenCommentBox = (userId) => {
        setSelectedUserId(userId);
    };

    const handleOpenInviteBox = () => setOpenInviteBox(true);

    const filteredTasks = tasks
        .filter((task) => Number(task.member_id) === Number(selectedUserId))
        .map((task) => ({
            ...task,
            comments: task.comments || [],
        }));

    return (
        <div className="flex h-screen bg-slate-950 overflow-hidden font-['Poppins',sans-serif]">
            <TeamSidebar slug={slugName} />

            <div className="flex-1 flex flex-col overflow-hidden">
                

                <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-900/80 via-slate-900 to-blue-900/20">
                    {openInviteBox && (
                        <AddMember
                            errors={errors}
                            flash={flash}
                            onClose={() => setOpenInviteBox(false)}
                        />
                    )}

                    <Calendar
                        tasks={filteredTasks}
                        loggedInUser={loggedInUser}
                        selectedUser={selectedUserId}
                        users={members}
                        errors={errors}
                        flash={flash}
                        comments={comments}
                    /> 
                    <Assignments />
                </main>
            </div>
        </div>
    );
}

export default Main;
