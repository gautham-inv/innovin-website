"use client";

import { useEffect, useRef } from "react";
import { CheckCircle, X } from "lucide-react";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    subMessage?: string;
    autoCloseMs?: number;
}

export default function SuccessModal({
    isOpen,
    onClose,
    title = "Thank you!",
    message = "Your submission was successful.",
    subMessage = "We'll get back to you as soon as possible.",
    autoCloseMs = 4000,
}: SuccessModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Auto-close after timeout
    useEffect(() => {
        if (!isOpen || !autoCloseMs) return;
        const timer = setTimeout(onClose, autoCloseMs);
        return () => clearTimeout(timer);
    }, [isOpen, autoCloseMs, onClose]);

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" />

            {/* Modal */}
            <div
                ref={modalRef}
                className="relative bg-[#131518] rounded-[16px] sm:rounded-[20px] w-full max-w-[480px] shadow-2xl overflow-hidden animate-[scaleIn_0.3s_ease-out]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors cursor-pointer"
                    aria-label="Close"
                >
                    <X className="size-5" />
                </button>

                {/* Content */}
                <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-6 sm:px-10 gap-5 sm:gap-6">
                    {/* Animated checkmark */}
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-[#66c2e2]/20 animate-ping" style={{ animationDuration: "1.5s", animationIterationCount: "1" }} />
                        <CheckCircle className="relative size-14 sm:size-16 text-[#66c2e2] animate-[scaleIn_0.4s_ease-out_0.1s_both]" />
                    </div>

                    <div className="text-center space-y-2 sm:space-y-3">
                        <h2 className="font-['Manrope',sans-serif] font-semibold text-[#66c2e2] text-xl sm:text-2xl animate-[fadeUp_0.4s_ease-out_0.2s_both]">
                            {title}
                        </h2>
                        <p className="font-['Manrope',sans-serif] font-medium text-white text-base sm:text-lg animate-[fadeUp_0.4s_ease-out_0.3s_both]">
                            {message}
                        </p>
                        <p className="font-['Manrope',sans-serif] font-normal text-[#878787] text-sm sm:text-base animate-[fadeUp_0.4s_ease-out_0.4s_both]">
                            {subMessage}
                        </p>
                    </div>

                    {/* Progress bar for auto-close */}
                    {autoCloseMs > 0 && (
                        <div className="w-full max-w-[200px] h-[3px] bg-white/10 rounded-full overflow-hidden mt-2">
                            <div
                                className="h-full bg-[#66c2e2]/60 rounded-full"
                                style={{
                                    animation: `shrink ${autoCloseMs}ms linear forwards`,
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Keyframe animations */}
            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
        </div>
    );
}
