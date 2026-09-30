import { Message } from "@/app/chat/page";
import { User } from "@/context/AppContext";
import React, { useEffect, useMemo, useRef } from "react";
import moment from "moment";
import { Check, CheckCheck } from "lucide-react";

interface ChatMessagesProps {
  selectedUser: string | null;
  messages: Message[] | null;
  loggedInUser: User | null;
}

const ChatMessages = ({
  selectedUser,
  messages,
  loggedInUser,
}: ChatMessagesProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const uniqueMessages = useMemo(() => {
    if (!messages) return [];
    const seen = new Set();
    return messages.filter((message) => {
      if (seen.has(message._id)) return false;
      seen.add(message._id);
      return true;
    });
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedUser, uniqueMessages]);

  const formatTime = (date: string) => moment(date).format("h:mm A");
  const formatDate = (date: string) => moment(date).format("MMM D, YYYY");

  const isSameDay = (date1: string, date2: string) => 
    moment(date1).isSame(moment(date2), 'day');

  return (
    <div className="flex-1 h-full overflow-hidden flex flex-col" style={{ backgroundColor: '#121212' }}>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-4 custom-scroll">
        {!selectedUser ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="p-5 rounded-2xl mb-5" style={{ background: 'rgba(3, 203, 161, 0.1)' }}>
              <svg className="w-12 h-12 mx-auto" style={{ color: '#03CBA1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-lg font-medium" style={{ color: 'var(--muted-text)' }}>No conversation selected</p>
            <p className="text-sm mt-1" style={{ color: 'var(--subtle-text)' }}>
              Select a user from the sidebar to start messaging
            </p>
          </div>
        ) : uniqueMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="p-5 rounded-2xl mb-5" style={{ background: 'rgba(3, 203, 161, 0.1)' }}>
              <svg className="w-12 h-12 mx-auto" style={{ color: '#03CBA1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <p className="text-lg font-medium" style={{ color: 'var(--muted-text)' }}>No messages yet</p>
            <p className="text-sm mt-1" style={{ color: 'var(--subtle-text)' }}>
              Send the first message to start the conversation
            </p>
          </div>
        ) : (
          <>
            {uniqueMessages.map((e, i) => {
              const isSentByMe = e.sender === loggedInUser?._id;
              const uniqueKey = `${e._id}-${i}`;
              const prevMessage = uniqueMessages[i - 1];
              const isPrevSameSender = prevMessage && prevMessage.sender === e.sender;
              const showDate = !isPrevSameSender || !isSameDay(prevMessage?.createdAt || '', e.createdAt);
              const showAvatar = !isPrevSameSender;

              return (
                <div
                  className={`flex gap-3 animate-slide-in ${isSentByMe ? 'flex-row-reverse' : ''}`}
                  key={uniqueKey}
                >
                  {/* Avatar (only for received messages or first in group) */}
                  {!isSentByMe && showAvatar && (
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1e1e1e' }}>
                        <svg className="w-4.5 h-4.5" style={{ color: 'var(--muted-text)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Message bubble column */}
                  <div className={`flex-1 max-w-[75%] ${isSentByMe ? 'items-end' : 'items-start'} flex flex-col`}>
                    {/* Date separator */}
                    {showDate && (
                      <div className={`flex w-full justify-center my-3 ${isSentByMe ? 'pr-2' : 'pl-2'}`}>
                        <span className="px-3 py-0.5 rounded-full text-xs font-medium" style={{ 
                          backgroundColor: 'rgba(255,255,255,0.06)',
                          color: 'var(--subtle-text)',
                          border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                          {formatDate(e.createdAt)}
                        </span>
                      </div>
                    )}

                    {/* Message bubble */}
                    <div
                      className={`relative max-w-full w-fit px-4.5 py-2.5 rounded-2xl shadow-sm ${
                        isSentByMe
                          ? 'rounded-tr-md'
                          : 'rounded-tl-md'
                      }`}
                      style={{
                        backgroundColor: isSentByMe ? '#03CBA1' : '#1e1e1e',
                        border: isSentByMe ? 'none' : '1px solid rgba(255,255,255,0.05)',
                        boxShadow: isSentByMe ? '0 2px 8px rgba(3, 203, 161, 0.2)' : '0 1px 3px rgba(0,0,0,0.3)',
                      }}
                    >
                      {/* Image */}
                      {e.messageType === "image" && e.image && (
                        <div className="relative rounded-xl overflow-hidden mb-2">
                          <img
                            src={e.image.url}
                            alt="shared image"
                            className="max-w-[300px] h-auto block"
                          />
                        </div>
                      )}

                      {/* Text */}
                      {e.text && (
                        <p 
                          className="whitespace-pre-wrap break-words text-base leading-relaxed"
                          style={{ 
                            color: isSentByMe ? '#121212' : '#ffffff',
                            fontWeight: isSentByMe ? 500 : 400,
                          }}
                        >
                          {e.text}
                        </p>
                      )}

                      {/* Time & Status */}
                      <div
                        className={`flex items-center gap-1.5 mt-2 ${isSentByMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <span className="text-[11px]" style={{ 
                          color: isSentByMe ? 'rgba(18, 18, 18, 0.6)' : 'rgba(255,255,255,0.4)',
                          fontWeight: 500,
                        }}>
                          {formatTime(e.createdAt)}
                        </span>

                        {isSentByMe && (
                          <div className="flex items-center gap-0.5">
                            {e.seen ? (
                              <div className="flex items-center gap-0.5" style={{ color: '#121212' }}>
                                <CheckCheck className="w-3.5 h-3.5" style={{ opacity: 0.8 }} />
                                {e.seenAt && (
                                  <span className="text-[10px]" style={{ opacity: 0.7 }}>
                                    {formatTime(e.seenAt)}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <Check className="w-3.5 h-3.5" style={{ color: 'rgba(18, 18, 18, 0.5)' }} />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alignment */}
                  {isSentByMe && <div className="w-8 flex-shrink-0" />}
                </div>
              );
            })}
            <div ref={bottomRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatMessages;