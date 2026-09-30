"use client";
import Loading from "@/components/Loading";
import { useAppData, Api_Url } from "@/context/AppContext";
import axios from "axios";
import { ArrowRight, Loader2, Mail, User, MessageCircle } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const { isAuth, loading: userLoading, fetchUser } = useAppData();

    const handleSubmit = async (
        e: React.FormEvent<HTMLElement>,
    ): Promise<void> => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post(`${Api_Url}/api/v1/login`, {
                email,
                name,
            });

            Cookies.set("token", data.token, { expires: 15 });

            toast.success(data.message);
            await fetchUser();
            router.push("/chat");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    if (userLoading) return <Loading />;
    if (isAuth) return redirect("/chat");
    return (
        <div className="min-h-screen flex overflow-hidden" style={{ backgroundColor: '#121212' }}>
            {/* Left Side - Branding Area */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between relative overflow-hidden">
                {/* Subtle gradient mesh background */}
                <div className="absolute inset-0" aria-hidden="true">
                    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-10" style={{ background: '#03CBA1' }} />
                    <div className="absolute bottom-40 right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-10" style={{ background: '#03CBA1' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-5" style={{ background: '#03CBA1' }} />
                </div>

                {/* Branding Content */}
                <div className="relative z-10 p-12 lg:p-20 flex flex-col h-full justify-between">
                    {/* Top - Logo/Icon */}
                    <div>
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8" style={{ background: 'rgba(3, 203, 161, 0.15)' }}>
                            <MessageCircle size={40} className="text-[var(--accent)]" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
                            Conversations<br />
                            <span style={{ color: '#03CBA1' }}>that flow</span>
                        </h1>
                        <p className="text-lg lg:text-xl max-w-lg" style={{ color: 'var(--muted-text)' }}>
                            Connect instantly with friends and colleagues. 
                            Real-time messaging built for modern teams.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 max-w-md">
                        <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="p-3 rounded-xl flex-shrink-0" style={{ background: 'rgba(3, 203, 161, 0.15)' }}>
                                <svg className="w-5 h-5" style={{ color: '#03CBA1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-white">Real-time messaging</p>
                                <p className="text-sm" style={{ color: 'var(--subtle-text)' }}>Instant delivery with Socket.io</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="p-3 rounded-xl flex-shrink-0" style={{ background: 'rgba(3, 203, 161, 0.15)' }}>
                                <svg className="w-5 h-5" style={{ color: '#03CBA1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-white">End-to-end encryption</p>
                                <p className="text-sm" style={{ color: 'var(--subtle-text)' }}>Your conversations stay private</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="p-3 rounded-xl flex-shrink-0" style={{ background: 'rgba(3, 203, 161, 0.15)' }}>
                                <svg className="w-5 h-5" style={{ color: '#03CBA1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-white">Image sharing</p>
                                <p className="text-sm" style={{ color: 'var(--subtle-text)' }}>Send photos seamlessly</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom attribution */}
                    <p className="text-sm" style={{ color: 'var(--subtle-text)' }}>
                        Built with Next.js, Socket.io & Tailwind CSS
                    </p>
                </div>
            </div>

            {/* Right Side - Form Area */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
                <div className="w-full max-w-md">
                    {/* Logo for mobile */}
                    <div className="lg:hidden flex justify-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl" style={{ background: 'rgba(3, 203, 161, 0.15)' }}>
                            <MessageCircle size={32} className="text-[var(--accent)]" />
                        </div>
                    </div>

                    {/* Form - No card border, seamless */}
                    <div className="space-y-8">
                        <div className="text-center lg:text-left mb-4">
                            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
                                Welcome back
                            </h2>
                            <p style={{ color: 'var(--muted-text)' }}>
                                Enter your details to continue
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-2.5"
                                    style={{ color: 'var(--muted-text)' }}
                                >
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200" style={{ color: 'var(--subtle-text)' }} aria-hidden="true" />
                                    <input
                                        type="email"
                                        id="email"
                                        autoComplete="email"
                                        className="w-full pl-12 pr-4 py-4.5 rounded-xl text-white placeholder-transparent transition-all duration-200 focus:outline-none"
                                        placeholder=" "
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{
                                            backgroundColor: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                        }}
                                    />
                                    <span className="absolute left-12 top-1/2 -translate-y-1/2 text-sm transition-all duration-200 pointer-events-none" style={{ color: 'var(--subtle-text)' }}>
                                        Enter your email address
                                    </span>
                                </div>
                                <style jsx>{`
                                    .group:focus-within input { 
                                        border-color: #03CBA1 !important; 
                                        box-shadow: 0 0 0 3px rgba(3, 203, 161, 0.15) !important;
                                        background-color: rgba(255,255,255,0.05) !important;
                                    }
                                    .group:focus-within span,
                                    .group input:not(:placeholder-shown) + span { 
                                        transform: translate(-8px, -30px) scale(0.85) !important; 
                                        color: #03CBA1 !important;
                                        background: #121212;
                                        padding: 0 4px;
                                    }
                                    .group input:not(:placeholder-shown) { padding-top: 1.25rem !important; padding-bottom: 0.75rem !important; }
                                `}</style>
                            </div>

                            {/* Name Field */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium mb-2.5"
                                    style={{ color: 'var(--muted-text)' }}
                                >
                                    Name
                                </label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200" style={{ color: 'var(--subtle-text)' }} aria-hidden="true" />
                                    <input
                                        type="text"
                                        id="name"
                                        autoComplete="name"
                                        className="w-full pl-12 pr-4 py-4.5 rounded-xl text-white placeholder-transparent transition-all duration-200 focus:outline-none"
                                        placeholder=" "
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={{
                                            backgroundColor: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                        }}
                                    />
                                    <span className="absolute left-12 top-1/2 -translate-y-1/2 text-sm transition-all duration-200 pointer-events-none" style={{ color: 'var(--subtle-text)' }}>
                                        Enter your name
                                    </span>
                                </div>
                                <style jsx>{`
                                    .group:focus-within input { 
                                        border-color: #03CBA1 !important; 
                                        box-shadow: 0 0 0 3px rgba(3, 203, 161, 0.15) !important;
                                        background-color: rgba(255,255,255,0.05) !important;
                                    }
                                    .group:focus-within span,
                                    .group input:not(:placeholder-shown) + span { 
                                        transform: translate(-8px, -30px) scale(0.85) !important; 
                                        color: #03CBA1 !important;
                                        background: #121212;
                                        padding: 0 4px;
                                    }
                                    .group input:not(:placeholder-shown) { padding-top: 1.25rem !important; padding-bottom: 0.75rem !important; }
                                `}</style>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-4.5 px-6 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden"
                                disabled={loading}
                                style={{
                                    backgroundColor: loading ? '#02a085' : '#03CBA1',
                                    color: '#121212',
                                }}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2 relative z-10">
                                        <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#121212' }} />
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2 relative z-10">
                                        <span>Sign In</span>
                                        <ArrowRight className="w-5 h-5" style={{ color: '#121212' }} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
                            </button>
                        </form>

                        <p className="text-center text-sm" style={{ color: 'var(--subtle-text)' }}>
                            New here? Your account will be created automatically on first sign in.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;