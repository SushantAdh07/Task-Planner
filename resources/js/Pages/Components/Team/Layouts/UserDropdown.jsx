import React from "react";
import { Link } from "@inertiajs/react";

const UserDropdown = ({ user, currentMember, members, onSelectUser, onInviteClick }) => (
    <div className="dropdown">
        <button
            className="btn flex items-center gap-2 dropdown-toggle bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-300"
            type="button"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            {currentMember.name}
            <ChevronDownIcon />
        </button>

        <ul className="dropdown-menu bg-slate-800 border border-white/10 rounded-lg shadow-lg py-2 mt-1" aria-labelledby="userDropdown">
            {members.map(member => (
                <li key={member.id}>
                    <button
                        onClick={() => onSelectUser(member.id)}
                        className={`w-full text-left px-4 py-2 hover:bg-white/5 text-slate-300 hover:text-white flex items-center ${
                            user.id === member.id ? "bg-blue-500/10 text-blue-300" : ""
                        }`}
                    >
                        {member.name}
                    </button>
                </li>
            ))}

            <li>
                <button
                    onClick={onInviteClick}
                    className="w-full text-left px-4 py-2 hover:bg-white/5 text-slate-300 hover:text-white flex items-center"
                >
                    <PlusIcon />
                    Add Member
                </button>
            </li>
            
            <li className="border-t border-white/5 mt-1 pt-1">
                <Link
                    href={route("logout")}
                    method="post"
                    className="dropdown-item px-4 py-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 flex items-center"
                >
                    <LogoutIcon />
                    Logout
                </Link>
            </li>
        </ul>
    </div>
);

const ChevronDownIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const PlusIcon = () => (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

const LogoutIcon = () => (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

export default UserDropdown;