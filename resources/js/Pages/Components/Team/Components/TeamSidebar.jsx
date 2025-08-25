import React, { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function TeamSidebar({slug, activeMenu, setActiveMenu}) {
    const [activeItem, setActiveItem] = useState("calendar");
    const [isCollapsed, setIsCollapsed] = useState(false);


    const menuItems = [
        {
            id: "calendar",
            name: "Calendar",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            ),
            badge: null,
        },
        {
            id: "assignments",
            name: "Assignments",
            link: '/plan/assignments',
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                </svg>
            ),
            badge: "8",
        },
        {
            id: "analytics",
            name: "Analytics",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                </svg>
            ),
            badge: null,
        },
    ];

    const quickActions = [
        {
            id: "new-task",
            name: "New Task",
            link: `/plan/${slug}`,
            icon: (
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
                        d="M12 4v16m8-8H4"
                    />
                </svg>
            ),
        },
        {
            id: "settings",
            name: "Settings",
            icon: (
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            ),
        },
    ];

    return (
        <div
            className={`h-screen bg-gradient-to-b from-slate-950/95 via-blue-950/95 to-slate-950/95 backdrop-blur-xl border-r border-white/10 transition-all duration-300 font-['Poppins',sans-serif] ${
                isCollapsed ? "w-16" : "w-64"
            } relative`}
        >
            <div className="p-6 border-b border-white/5">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                            </div>
                            <span className="text-lg font-medium bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent tracking-tight">
                                Planora
                            </span>
                        </div>
                    )}

                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                        <svg
                            className={`w-4 h-4 transition-transform duration-300 ${
                                isCollapsed ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {!isCollapsed && (
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-medium text-sm">
                            JD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                John Doe
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                                john@company.com
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 py-6">
                <div className="px-3">
                    {!isCollapsed && (
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4 px-3">
                            Navigation
                        </p>
                    )}

                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <a
                                key={item.id}
                                href={item.link}
                                onClick={() => setActiveMenu(item.id)}
                                className={`w-full flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                                    activeItem === item.id
                                        ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-white shadow-lg shadow-blue-500/10"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                <div
                                    className={`flex-shrink-0 transition-all duration-300 ${
                                        activeItem === item.id
                                            ? "text-blue-400"
                                            : "group-hover:text-white group-hover:scale-110"
                                    }`}
                                >
                                    {item.icon}
                                </div>

                                {!isCollapsed && (
                                    <>
                                        <span className="ml-3 tracking-wide">
                                            {item.name}
                                        </span>
                                        {item.badge && (
                                            <span className="ml-auto px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                                                {item.badge}
                                            </span>
                                        )}
                                    </>
                                )}
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="px-3 mt-8">
                    {!isCollapsed && (
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4 px-3">
                            Quick Actions
                        </p>
                    )}

                    <div className="space-y-2">
                        {quickActions.map((action) => (
                            <a
                                href={action.link}
                                key={action.id}
                                className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 group"
                            >
                                <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    {action.icon}
                                </div>
                                {!isCollapsed && (
                                    <span className="ml-3 tracking-wide">
                                        {action.name}
                                    </span>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-white/5">
                
            </div>

            <div className="absolute top-20 right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        </div>
    );
}
