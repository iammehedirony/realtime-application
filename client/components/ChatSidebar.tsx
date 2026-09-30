"use client";

import { User } from "@/context/AppContext";
import {
    CornerDownRight,
    CornerUpLeft,
    LogOut,
    MessageCircle,
    Plus,
    Search,
    UserCircle,
    X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface ChatSidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    showAllUsers: boolean;
    setShowAllUsers: (show: boolean | ((prev: boolean) => boolean)) => void;
    users: User[] | null;
    loggedInUser: User | null;
    chats: any[] | null;
    selectedUser: string | null;
    setSelectedUser: (userId: string | null) => void;
    handleLogout: () => void;
    createChat: (user: User) => void;
    onlineUsers: string[];
}

const ChatSidebar = ({
    sidebarOpen,
    setShowAllUsers,
    setSidebarOpen,
    showAllUsers,
    users,
    loggedInUser,
    chats,
    selectedUser,
    setSelectedUser,
    handleLogout,
    createChat,
    onlineUsers,
}: ChatSidebarProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Filtered lists with safety checks
    const filteredUsers = users?.filter(
        (u) =>
            u._id !== loggedInUser?._id &&
            u.name?.toLowerCase().includes(searchQuery.trim().toLowerCase()),
    );

    const filteredChats = chats?.filter((chat) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.trim().toLowerCase();
        const userNameMatch = chat.user?.name?.toLowerCase().includes(query);
        const lastMsgMatch = chat.chat?.latestMessage?.text
            ?.toLowerCase()
            .includes(query);
        return userNameMatch || lastMsgMatch;
    });

    return (
        <aside
            className={`fixed z-20 sm:static top-0 left-0 h-screen w-80 border-r transition-transform duration-300 flex flex-col overflow-x-hidden ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0`}
            style={{
                backgroundColor: "#0a0a0a",
                borderColor: "#1e1e1e",
            }}
        >
            {/* Header */}
            <div
                className="p-5 border-b flex-shrink-0"
                style={{ borderColor: "#1e1e1e" }}
            >
                <div className="sm:hidden flex justify-end mb-4">
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2.5 rounded-xl transition-colors"
                        style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                        aria-label="Close sidebar"
                    >
                        <X className="w-5 h-5" style={{ color: "#a1a1aa" }} />
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div
                            className="p-2.5 rounded-xl"
                            style={{ background: "rgba(3, 203, 161, 0.15)" }}
                        >
                            <MessageCircle
                                className="w-5 h-5"
                                style={{ color: "#03CBA1" }}
                            />
                        </div>
                        <h2 className="text-xl font-bold text-white">
                            {showAllUsers ? "New Chat" : "Messages"}
                        </h2>
                    </div>

                    <button
                        className="p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center"
                        onClick={() => {
                            setShowAllUsers((prev) => !prev);
                            setSearchQuery(""); // Clear search when toggling tabs
                        }}
                        style={{
                            backgroundColor: showAllUsers
                                ? "rgba(255,255,255,0.03)"
                                : "#03CBA1",
                            color: showAllUsers ? "#a1a1aa" : "#121212",
                        }}
                        aria-label={
                            showAllUsers ? "Back to messages" : "Start new chat"
                        }
                    >
                        {showAllUsers ? (
                            <X className="w-4 h-4" />
                        ) : (
                            <Plus className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>

            {/* Search Section */}
            <div
                className="p-4 border-b flex-shrink-0"
                style={{ borderColor: "#1e1e1e" }}
            >
                <div className="relative">
                    <Search
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                        style={{ color: "#71717a" }}
                        aria-hidden="true"
                    />
                    <input
                        type="text"
                        placeholder={
                            showAllUsers ? "Search users..." : "Search chats..."
                        }
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white bg-white/5 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#03CBA1] border border-white/10 placeholder:text-zinc-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-hidden flex flex-col">
                {showAllUsers ? (
                    /* New Chat (Users List) */
                    <div
                        className="flex-1 overflow-y-auto overflow-x-hidden pb-4 px-3 pt-3 custom-scroll"
                        style={{ scrollbarWidth: "thin" }}
                    >
                        {filteredUsers && filteredUsers.length > 0 ? (
                            filteredUsers.map((u) => (
                                <button
                                    key={u._id}
                                    className="w-full px-4 py-3.5 rounded-xl transition-all duration-150 flex items-center gap-3 hover:bg-white/5 mb-1"
                                    onClick={() => {
                                        createChat(u);
                                        setSearchQuery("");
                                    }}
                                    style={{ borderRadius: "14px" }}
                                >
                                    <div className="relative flex-shrink-0">
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center"
                                            style={{
                                                backgroundColor: "#1e1e1e",
                                            }}
                                        >
                                            <UserCircle
                                                className="w-7 h-7"
                                                style={{ color: "#a1a1aa" }}
                                            />
                                        </div>
                                        {onlineUsers.includes(u._id) && (
                                            <span
                                                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2"
                                                style={{
                                                    backgroundColor: "#03CBA1",
                                                    borderColor: "#0a0a0a",
                                                }}
                                            />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="font-medium text-white truncate">
                                            {u.name}
                                        </p>
                                        <p
                                            className="text-xs mt-0.5"
                                            style={{
                                                color: onlineUsers.includes(
                                                    u._id,
                                                )
                                                    ? "#03CBA1"
                                                    : "#71717a",
                                            }}
                                        >
                                            {onlineUsers.includes(u._id)
                                                ? "Online"
                                                : "Offline"}
                                        </p>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="text-center py-8 text-sm text-zinc-500">
                                No users found
                            </div>
                        )}
                    </div>
                ) : filteredChats && filteredChats.length > 0 ? (
                    /* Messages List */
                    <div
                        className="flex-1 overflow-y-auto overflow-x-hidden pb-4 px-3 pt-3 custom-scroll"
                        style={{ scrollbarWidth: "thin" }}
                    >
                        {filteredChats.map((chat) => {
                            const latestMessage = chat.chat.latestMessage;
                            const isSelected = selectedUser === chat.chat._id;
                            const isSentByMe =
                                latestMessage?.sender === loggedInUser?._id;
                            const unseenCount = chat.chat.unseenCount || 0;

                            return (
                                <button
                                    key={chat.chat._id}
                                    onClick={() => {
                                        setSelectedUser(chat.chat._id);
                                        setSidebarOpen(false);
                                    }}
                                    className={`w-full px-4 py-3.5 rounded-xl transition-all duration-150 flex items-center gap-3 mb-1 ${
                                        isSelected
                                            ? "bg-white/5"
                                            : "hover:bg-white/5"
                                    }`}
                                    style={{
                                        borderRadius: "14px",
                                        backgroundColor: isSelected
                                            ? "rgba(3, 203, 161, 0.12)"
                                            : "transparent",
                                    }}
                                >
                                    <div className="relative flex-shrink-0">
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center"
                                            style={{
                                                backgroundColor: "#1e1e1e",
                                            }}
                                        >
                                            <UserCircle
                                                className="w-7 h-7"
                                                style={{ color: "#a1a1aa" }}
                                            />
                                        </div>
                                        {onlineUsers.includes(
                                            chat.user._id,
                                        ) && (
                                            <span
                                                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2"
                                                style={{
                                                    backgroundColor: "#03CBA1",
                                                    borderColor: "#0a0a0a",
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="font-semibold truncate text-white">
                                                {chat.user.name}
                                            </p>
                                            {unseenCount > 0 && (
                                                <span
                                                    className="flex-shrink-0 ml-2 min-w-[22px] h-5 rounded-full px-2 flex items-center justify-center text-xs font-bold"
                                                    style={{
                                                        backgroundColor:
                                                            "#03CBA1",
                                                        color: "#121212",
                                                    }}
                                                >
                                                    {unseenCount > 99
                                                        ? "99+"
                                                        : unseenCount}
                                                </span>
                                            )}
                                        </div>

                                        {latestMessage && (
                                            <div className="flex items-center gap-2">
                                                {isSentByMe ? (
                                                    <CornerUpLeft
                                                        size={13}
                                                        className="flex-shrink-0"
                                                        style={{
                                                            color: "#03CBA1",
                                                        }}
                                                    />
                                                ) : (
                                                    <CornerDownRight
                                                        size={13}
                                                        className="flex-shrink-0"
                                                        style={{
                                                            color: "#a1a1aa",
                                                        }}
                                                    />
                                                )}
                                                <p
                                                    className="text-sm truncate flex-1"
                                                    style={{
                                                        color: isSelected
                                                            ? "#a1a1aa"
                                                            : "#71717a",
                                                    }}
                                                >
                                                    {latestMessage.text}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center h-full text-center px-4">
                        <div
                            className="p-4 rounded-2xl mb-4"
                            style={{ background: "rgba(3, 203, 161, 0.1)" }}
                        >
                            <MessageCircle
                                className="w-8 h-8 mx-auto"
                                style={{ color: "#03CBA1" }}
                            />
                        </div>
                        <p className="font-medium text-zinc-300">
                            No conversations found
                        </p>
                        <p className="text-sm mt-1 text-zinc-500">
                            Start a new chat to begin messaging
                        </p>
                    </div>
                )}

                {/* Footer */}
                <div
                    className="p-4 px-3 border-t flex-shrink-0 space-y-2 overflow-x-hidden"
                    style={{ borderColor: "#1e1e1e" }}
                >
                    <Link
                        href="/profile"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-white/5"
                        style={{ borderRadius: "14px" }}
                    >
                        <div
                            className="p-2.5 rounded-xl flex-shrink-0"
                            style={{ background: "rgba(3, 203, 161, 0.15)" }}
                        >
                            <UserCircle
                                className="w-4 h-4"
                                style={{ color: "#03CBA1" }}
                            />
                        </div>
                        <span className="font-medium text-white truncate">
                            Profile
                        </span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-white/5"
                        style={{ borderRadius: "14px" }}
                    >
                        <div
                            className="p-2.5 rounded-xl flex-shrink-0"
                            style={{ background: "rgba(255, 71, 87, 0.15)" }}
                        >
                            <LogOut
                                className="w-4 h-4"
                                style={{ color: "#ff4757" }}
                            />
                        </div>
                        <span className="font-medium text-white truncate text-left">
                            Logout
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default ChatSidebar;
