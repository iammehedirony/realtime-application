import { Loader2, Paperclip, Send, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface MessageInputProps {
    selectedUser: string | null;
    message: string;
    setMessage: (message: string) => void;
    handleMessageSend: (e: any, imageFile?: File | null) => void;
}

const MessageInput = ({
    selectedUser,
    message,
    setMessage,
    handleMessageSend,
}: MessageInputProps) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showAttachMenu, setShowAttachMenu] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim() && !imageFile) return;

        setIsUploading(true);
        await handleMessageSend(e, imageFile);
        setImageFile(null);
        setIsUploading(false);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
        }
    }, [message]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setImageFile(file);
        }
        setShowAttachMenu(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    if (!selectedUser) return null;

    return (
        <form onSubmit={handleSubmit} className="flex-shrink-0">
            {/* Hidden file input for attachment */}
            <input
                ref={fileInputRef}
                id="message-file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
            />

            {/* Attach Menu Dropdown */}
            {showAttachMenu && (
                <div
                    className="absolute bottom-full left-4 right-4 mb-2 animate-slide-in z-20"
                    role="menu"
                >
                    <div className="flex gap-2 justify-end">
                        <label
                            htmlFor="message-file-input"
                            className="flex items-center gap-2 px-4 py-3 rounded-xl transition-colors w-full max-w-xs cursor-pointer"
                            style={{
                                backgroundColor: "#1e1e1e",
                                border: "1px solid rgba(255,255,255,0.05)",
                            }}
                        >
                            <div
                                className="p-2 rounded-lg flex-shrink-0"
                                style={{
                                    background: "rgba(3, 203, 161, 0.15)",
                                }}
                            >
                                <svg
                                    className="w-5 h-5"
                                    style={{ color: "#03CBA1" }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <span className="font-medium text-white">
                                Photo
                            </span>
                        </label>
                    </div>
                </div>
            )}

            {/* Main Input Bar - Floating pill */}
            <div className="relative mx-4 sm:mx-8 lg:mx-12 mb-4 sm:mb-6">
                <div className="relative" style={{ borderRadius: "28px" }}>
                    {/* Background blur layer */}
                    <div className="absolute inset-0 rounded-[28px] bg-[#0a0a0a]/80 backdrop-blur-xl" />

                    {/* Border */}
                    <div
                        className="absolute inset-0 rounded-[28px] pointer-events-none"
                        style={{
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow:
                                "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
                        }}
                    />

                    {/* Content */}
                    <div className="relative flex items-center gap-2 p-1.5">
                        {/* Attach Button */}
                        <div className="relative flex-shrink-0">
                            <label
                                htmlFor="message-file-input"
                                className="p-2.5 rounded-xl transition-all duration-150 flex items-center justify-center cursor-pointer"
                                onMouseEnter={() => setShowAttachMenu(true)}
                                onMouseLeave={() =>
                                    setTimeout(
                                        () => setShowAttachMenu(false),
                                        100,
                                    )
                                }
                                style={{ backgroundColor: "transparent" }}
                                aria-label="Attach image"
                            >
                                <Paperclip
                                    size={20}
                                    className="transition-colors"
                                    style={{ color: "var(--muted-text)" }}
                                />
                            </label>
                        </div>

                        {/* Textarea */}
                        <div className="flex-1 min-w-0 flex items-center">
                            <textarea
                                ref={textareaRef}
                                className="w-full bg-transparent border-0 resize-none text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-transparent py-2.5"
                                placeholder={
                                    imageFile
                                        ? "Add a caption..."
                                        : "Type a message..."
                                }
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={1}
                                style={{
                                    maxHeight: "150px",
                                    fontSize: "15px",
                                    lineHeight: "1.5",
                                    fontFamily: "inherit",
                                    color: "#ffffff",
                                    outline: "none", // ফোকাস আউটলাইন রিমুভ করার জন্য
                                    boxShadow: "none", // রিং বা শ্যাডো রিমুভ করার জন্য
                                    borderColor: "transparent",
                                }}
                            />
                        </div>

                        {/* Send Button */}
                        <button
                            type="submit"
                            disabled={
                                (!imageFile && !message.trim()) || isUploading
                            }
                            className="flex-shrink-0 p-2.5 rounded-xl transition-all duration-150 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{
                                backgroundColor: "#03CBA1",
                                color: "#121212",
                            }}
                        >
                            {isUploading ? (
                                <Loader2
                                    className="w-5 h-5 animate-spin"
                                    style={{ color: "#121212" }}
                                />
                            ) : (
                                <Send
                                    className="w-5 h-5"
                                    style={{ color: "#121212" }}
                                />
                            )}
                        </button>
                    </div>
                </div>

                {/* Image Preview */}
                {imageFile && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 animate-fade-in">
                        <div className="flex justify-end">
                            <div className="relative max-w-xs">
                                <img
                                    src={URL.createObjectURL(imageFile)}
                                    alt="preview"
                                    className="w-full rounded-xl border"
                                    style={{
                                        borderColor: "rgba(255,255,255,0.08)",
                                    }}
                                />
                                <button
                                    type="button"
                                    className="absolute top-1.5 right-1.5 p-1.5 rounded-full flex items-center justify-center"
                                    onClick={() => setImageFile(null)}
                                    style={{
                                        backgroundColor: "rgba(0,0,0,0.7)",
                                        backdropFilter: "blur(4px)",
                                    }}
                                >
                                    <X className="w-3.5 h-3.5 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
};

export default MessageInput;
