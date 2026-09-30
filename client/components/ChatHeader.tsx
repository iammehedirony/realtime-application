import { User } from "@/context/AppContext";
import { Menu, UserCircle, MoreHorizontal } from "lucide-react";
import React from "react";

interface ChatHeaderProps {
    user: User | null;
    setSidebarOpen: (open: boolean) => void;
    isTyping: boolean;
    onlineUsers: string[];
}

const ChatHeader = ({
    user,
    setSidebarOpen,
    isTyping,
    onlineUsers,
}: ChatHeaderProps) => {
    const isOnlineUser = user && onlineUsers.includes(user._id);
    return (
        <>
            {/* Mobile sidebar toggle */}
            <div
                className="sm:hidden fixed top-0 left-0 right-0 z-40 px-3 py-3 bg-[#0a0a0a]/95 backdrop-blur-sm border-b"
                style={{ borderColor: "#1e1e1e" }}
            >
                <div className="flex items-center justify-between h-14">
                    <button
                        className="p-2.5 rounded-xl transition-colors flex-shrink-0"
                        onClick={() => setSidebarOpen(true)}
                        style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                    >
                        <Menu
                            className="w-5 h-5"
                            style={{ color: "var(--muted-text)" }}
                        />
                    </button>

                    {user ? (
                        <div className="flex-1 flex items-center justify-center px-4 min-w-0">
                            <div className="flex items-center gap-2.5 max-w-full">
                                <div className="relative flex-shrink-0">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: "#1e1e1e" }}
                                    >
                                        <UserCircle
                                            className="w-4.5 h-4.5"
                                            style={{
                                                color: "var(--muted-text)",
                                            }}
                                        />
                                    </div>
                                    {isOnlineUser && (
                                        <span
                                            className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                                            style={{
                                                backgroundColor: "#03CBA1",
                                                borderColor: "#0a0a0a",
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col items-start min-w-0">
                                    <span className="font-semibold text-white truncate max-w-[130px] text-sm leading-tight">
                                        {user.name}
                                    </span>
                                    {isTyping ? (
                                        <span
                                            className="text-[11px] font-medium mt-0.5 flex items-center gap-1"
                                            style={{ color: "#03CBA1" }}
                                        >
                                            <span className="inline-flex gap-0.5">
                                                <span
                                                    className="w-1 h-1 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            "#03CBA1",
                                                        animation:
                                                            "bounce 1.4s infinite ease-in-out",
                                                    }}
                                                />
                                                <span
                                                    className="w-1 h-1 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            "#03CBA1",
                                                        animation:
                                                            "bounce 1.4s infinite ease-in-out 0.1s",
                                                    }}
                                                />
                                                <span
                                                    className="w-1 h-1 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            "#03CBA1",
                                                        animation:
                                                            "bounce 1.4s infinite ease-in-out 0.2s",
                                                    }}
                                                />
                                            </span>
                                            typing...
                                        </span>
                                    ) : (
                                        <span
                                            className="text-[11px] mt-0.5"
                                            style={{
                                                color: isOnlineUser
                                                    ? "#03CBA1"
                                                    : "var(--subtle-text)",
                                            }}
                                        >
                                            {isOnlineUser
                                                ? "Online"
                                                : "Offline"}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1" />
                    )}

                    <div className="w-10 flex-shrink-0" />
                </div>
            </div>

            {/* Desktop Header - minimal bar */}
            <div
                className="hidden sm:flex items-center justify-between h-16 px-4 border-b bg-[#0a0a0a]/95 backdrop-blur-sm sticky top-0 z-30 flex-shrink-0"
                style={{ borderColor: "#1e1e1e" }}
            >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {user ? (
                        <>
                            <div className="relative flex-shrink-0">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: "#1e1e1e" }}
                                >
                                    <UserCircle
                                        className="w-5.5 h-5.5"
                                        style={{ color: "var(--muted-text)" }}
                                    />
                                </div>
                                {isOnlineUser && (
                                    <span
                                        className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2 animate-pulse"
                                        style={{
                                            backgroundColor: "#03CBA1",
                                            borderColor: "#0a0a0a",
                                        }}
                                    />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-white truncate">
                                    {user.name}
                                </p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    {isTyping ? (
                                        <span
                                            className="text-xs font-medium"
                                            style={{ color: "#03CBA1" }}
                                        >
                                            <span className="inline-flex gap-0.5 mr-1">
                                                <span
                                                    className="w-1.5 h-1.5 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            "#03CBA1",
                                                        animation:
                                                            "bounce 1.4s infinite ease-in-out",
                                                    }}
                                                />
                                                <span
                                                    className="w-1.5 h-1.5 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            "#03CBA1",
                                                        animation:
                                                            "bounce 1.4s infinite ease-in-out 0.1s",
                                                    }}
                                                />
                                                <span
                                                    className="w-1.5 h-1.5 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            "#03CBA1",
                                                        animation:
                                                            "bounce 1.4s infinite ease-in-out 0.2s",
                                                    }}
                                                />
                                            </span>
                                            typing...
                                        </span>
                                    ) : (
                                        <span
                                            className="flex items-center gap-1.5 text-xs"
                                            style={{
                                                color: isOnlineUser
                                                    ? "#03CBA1"
                                                    : "var(--subtle-text)",
                                            }}
                                        >
                                            <span
                                                className="w-1.5 h-1.5 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        isOnlineUser
                                                            ? "#03CBA1"
                                                            : "var(--subtle-text)",
                                                }}
                                            />
                                            {isOnlineUser
                                                ? "Online"
                                                : "Offline"}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: "#1e1e1e" }}
                            >
                                <UserCircle
                                    className="w-5.5 h-5.5"
                                    style={{ color: "var(--muted-text)" }}
                                />
                            </div>
                            <div>
                                <p
                                    className="font-semibold"
                                    style={{ color: "var(--muted-text)" }}
                                >
                                    Select a conversation
                                </p>
                                <p
                                    className="text-xs"
                                    style={{ color: "var(--subtle-text)" }}
                                >
                                    Choose a chat from the sidebar
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                    <button
                        className="p-2.5 rounded-xl transition-colors"
                        style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                    >
                        <MoreHorizontal
                            className="w-5 h-5"
                            style={{ color: "var(--muted-text)" }}
                        />
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChatHeader;
