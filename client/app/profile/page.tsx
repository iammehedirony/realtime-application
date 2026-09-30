"use client";
import { useAppData, Api_Url } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import { ArrowLeft, Save, User, UserCircle } from "lucide-react";

const ProfilePage = () => {
    const { user, isAuth, loading, setUser } = useAppData();

    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState<string | undefined>("");

    const router = useRouter();

    const editHandler = () => {
        setIsEdit(!isEdit);
        setName(user?.name);
    };

    const submitHandler = async (e: any) => {
        e.preventDefault();
        const token = Cookies.get("token");
        try {
            const { data } = await axios.post(
                `${Api_Url}/api/v1/update/user`,
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            Cookies.set("token", data.token, {
                expires: 15,
                secure: false,
                path: "/",
            });

            toast.success(data.message);
            setUser(data.user);
            setIsEdit(false);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if (!isAuth && !loading) {
            router.push("/login");
        }
    }, [isAuth, router, loading]);

    if (loading) return <Loading />;
    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8" style={{ backgroundColor: '#121212' }}>
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 animate-fade-in">
                    <button
                        onClick={() => router.push("/chat")}
                        className="p-3 rounded-xl transition-colors flex-shrink-0"
                        style={{ backgroundColor: 'var(--card-bg)' }}
                    >
                        <ArrowLeft className="w-5 h-5 text-[var(--muted-text)]" />
                    </button>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                            Profile Settings
                        </h1>
                        <p className="text-[var(--muted-text)] mt-1">
                            Manage your account information
                        </p>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="rounded-2xl border border-[var(--card-border)] overflow-hidden animate-slide-in" style={{ backgroundColor: 'var(--card-bg)' }}>
                    {/* Profile Header */}
                    <div className="p-6 sm:p-8 border-b border-[var(--card-border)]">
                        <div className="flex items-center gap-5 sm:gap-6">
                            <div className="relative flex-shrink-0">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[var(--card-border)] flex items-center justify-center">
                                    <UserCircle className="w-12 h-12 sm:w-14 sm:h-14 text-[var(--muted-text)]" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[var(--card-bg)] pulse-ring" style={{ backgroundColor: '#03CBA1' }}>
                                    <span className="absolute inset-0 rounded-full" style={{ backgroundColor: '#03CBA1', opacity: 0.3 }} />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h2 className="text-2xl sm:text-3xl font-bold text-white truncate">
                                    {user?.name || "User"}
                                </h2>
                                <p className="text-sm mt-1 flex items-center gap-1.5" style={{ color: '#03CBA1' }}>
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#03CBA1' }} />
                                    <span className="font-medium">Active now</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="p-6 sm:p-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-[var(--muted-text)] mb-3">
                                    Display Name
                                </label>

                                {isEdit ? (
                                    <form
                                        onSubmit={submitHandler}
                                        className="space-y-4 animate-fade-in"
                                    >
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                                className="w-full pl-12 pr-4 py-4 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl text-white placeholder-[var(--subtle-text)] transition-all duration-200 focus:border-[var(--input-focus)] focus:ring-2 focus:ring-[var(--accent-muted)] focus:outline-none"
                                            />
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--subtle-text)]" />
                                        </div>

                                        <div className="flex gap-3 pt-2">
                                            <button
                                                type="submit"
                                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 focus:ring-2 focus:ring-[var(--accent-muted)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
                                                style={{ backgroundColor: '#03CBA1' }}
                                            >
                                                <Save className="w-4 h-4" />
                                                <span>Save Changes</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={editHandler}
                                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 focus:ring-2 focus:ring-[var(--card-border)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
                                                style={{ backgroundColor: 'var(--card-border)' }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)' }}>
                                        <span className="text-white font-medium text-lg truncate">
                                            {user?.name || "Not set"}
                                        </span>
                                        <button
                                            onClick={editHandler}
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white transition-all duration-200 focus:ring-2 focus:ring-[var(--accent-muted)] focus:ring-offset-2 focus:ring-offset-[var(--background)] flex-shrink-0"
                                            style={{ backgroundColor: '#03CBA1' }}
                                        >
                                            <User className="w-4 h-4" />
                                            <span>Edit</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Additional Info Section */}
                            <div className="pt-6 border-t border-[var(--card-border)]">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg" style={{ background: 'rgba(3, 203, 161, 0.15)' }}>
                                        <User className="w-4 h-4" style={{ color: '#03CBA1' }} />
                                    </div>
                                    Account Information
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)' }}>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg" style={{ background: 'rgba(3, 203, 161, 0.1)' }}>
                                                <svg className="w-5 h-5" style={{ color: '#03CBA1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-[var(--subtle-text)]">User ID</p>
                                                <p className="text-sm font-mono text-[var(--muted-text)] truncate max-w-[200px]">
                                                    {user?._id || "—"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer hint */}
                <p className="text-center text-[var(--subtle-text)] text-sm mt-6">
                    Your data is securely stored and never shared with third parties.
                </p>
            </div>
        </div>
    );
};

export default ProfilePage;