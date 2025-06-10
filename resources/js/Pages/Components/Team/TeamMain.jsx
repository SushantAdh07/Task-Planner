import React, { useState, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import Calendar from "./CustomCalendar";
import AddMember from "./Member/AddMember";
import TeamSidebar from "./TeamSidebar";
import UserDropdown from "./Layouts/UserDropdown";

const TeamMain = ({ 
    tasks = [], 
    members = [], 
    auth, 
    errors, 
    slug 
}) => {
    const { flash } = usePage().props;
    const [selectedUserId, setSelectedUserId] = useState(auth.user.id);
    const [showInviteModal, setShowInviteModal] = useState(false);
    
    const filteredTasks = tasks
        .filter(task => task.member_id === selectedUserId)
        .map(task => ({
            ...task,
            comments: task.comments || []
        }));

    const currentMember = members.find(user => user.id === selectedUserId) || auth.user;

    return (
        <div className="flex h-screen bg-slate-950 overflow-hidden font-poppins">
            <TeamSidebar slug={slug} />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    user={auth.user} 
                    currentMember={currentMember}
                    members={members}
                    onSelectUser={setSelectedUserId}
                    onInviteClick={() => setShowInviteModal(true)}
                />
                
                <MainContent>
                    
                    {showInviteModal && (
                        <AddMember
                            errors={errors}
                            onClose={() => setShowInviteModal(false)}
                        />
                    )}
                    
                    <Calendar
                        tasks={filteredTasks}
                        currentUser={auth.user.id}
                        selectedUser={selectedUserId}
                        members={members}
                    />
                </MainContent>
            </div>
        </div>
    );
};

const Header = ({ user, currentMember, members, onSelectUser, onInviteClick }) => (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-white/10 px-4 py-2">
        <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Calendar for {user.name}
            </h1>
            
            <UserDropdown 
                user={user}
                currentMember={currentMember}
                members={members}
                onSelectUser={onSelectUser}
                onInviteClick={onInviteClick}
            />
        </div>
    </header>
);

const MainContent = ({ children }) => (
    <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-900/80 via-slate-900 to-blue-900/20">
        {children}
    </main>
);

export default TeamMain;