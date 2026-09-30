import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: '#121212' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[var(--card-border)] border-t-[var(--accent)] rounded-full animate-spin" />
        <p className="text-[var(--muted-text)] font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;