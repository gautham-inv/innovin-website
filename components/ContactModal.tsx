"use client";

import { useState, useEffect, useRef, createContext, useContext, ReactNode } from "react";
import { ChevronUp, ArrowRight, X } from "lucide-react";

// Context for managing modal state
interface ContactModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ContactModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <ContactModal />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return context;
}

// Form data interface
interface ContactFormData {
  name: string;
  company: string;
  email: string;
  message: string;
}

function ContactModal() {
  const { isOpen, closeModal } = useContactModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const companyInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setFormData({ name: "", company: "", email: "", message: "" });
    }
  }, [isOpen]);

  // Focus input on step change
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        switch (currentStep) {
          case 1:
            nameInputRef.current?.focus();
            break;
          case 2:
            companyInputRef.current?.focus();
            break;
          case 3:
            emailInputRef.current?.focus();
            break;
          case 4:
            messageInputRef.current?.focus();
            break;
        }
      }, 100);
    }
  }, [currentStep, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEnter = () => {
    if (currentStep < 5) {
      handleNext();
    } else {
      // Submit form
      console.log("Form submitted:", formData);
      // Here you would typically send the data to your backend
      closeModal();
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      action();
    }
  };

  // Navigation button component (matches design)
  const NavButton = ({ onClick, disabled, rotate = false }: { onClick: () => void; disabled?: boolean; rotate?: boolean }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#5e5e5e] flex items-center justify-center p-[4.8px] rounded-[42px] shrink-0 transition-opacity ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-80 cursor-pointer"
      }`}
    >
      <div className={`flex items-center justify-center size-[14.4px] ${rotate ? "rotate-[180deg] scale-y-[-100%]" : ""}`}>
        <ChevronUp className="size-[14.4px] rotate-[270deg] text-white" />
      </div>
    </button>
  );

  // Exit button (matches navigation button design)
  const ExitButton = () => (
    <button
      onClick={closeModal}
      className="bg-[#5e5e5e] flex items-center justify-center p-[4.8px] rounded-[42px] shrink-0 hover:opacity-80 cursor-pointer transition-opacity"
      aria-label="Close modal"
    >
      <div className="flex items-center justify-center size-[14.4px]">
        <X className="size-[14.4px] text-white" />
      </div>
    </button>
  );

  // Step indicator component
  const StepIndicator = ({ step }: { step: number }) => (
    <div className="flex gap-2 sm:gap-[12px] h-[28px] sm:h-[32px] items-center shrink-0">
      <div className="relative shrink-0 size-[14px] sm:size-[16px]">
        <div className="absolute inset-0 rounded-full border border-white/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-[6px] sm:size-[8px] rounded-full bg-white" />
        </div>
      </div>
      <p className="font-['Manrope',sans-serif] font-light leading-[1.2] sm:leading-[60px] shrink-0 text-[12px] sm:text-[14px] text-nowrap text-white whitespace-pre">
        {step}/5
      </p>
    </div>
  );

  // Please enter button component
  const PleaseEnterButton = ({ onClick }: { onClick: () => void }) => (
    <div className="flex gap-2 sm:gap-[10px] items-center shrink-0">
      <p className="font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[#ababab] text-[14px] sm:text-[16px] text-nowrap whitespace-pre">
        Please enter
      </p>
      <button
        onClick={onClick}
        className="relative shrink-0 size-[20px] sm:size-[24px] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
        aria-label="Enter"
      >
        <ArrowRight className="size-[18px] sm:size-[20px] text-[#ababab]" />
      </button>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
      onClick={(e) => {
        // On mobile, clicking outside closes the modal
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      {/* Backdrop with reduced brightness */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-[#131518] rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] w-full max-w-[680px] shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with exit button - hidden on mobile */}
        <div className="bg-[#131518] flex flex-col sm:flex-row gap-2 sm:gap-[361px] min-h-[54px] h-auto sm:h-[54px] items-start sm:items-center px-4 sm:px-[30px] py-3 sm:py-[10px] rounded-tl-[12px] sm:rounded-tl-[16px] lg:rounded-tl-[20px] rounded-tr-[12px] sm:rounded-tr-[16px] lg:rounded-tr-[20px] shrink-0 relative">
          <div className="flex-1 w-full sm:w-auto">
            {currentStep === 1 && <p className="font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[#878787] text-[14px] sm:text-[16px] text-nowrap whitespace-pre">What's your name?</p>}
            {currentStep === 2 && <p className="font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[#878787] text-[14px] sm:text-[16px] text-nowrap whitespace-pre">What's your company name</p>}
            {currentStep === 3 && <p className="font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[#878787] text-[14px] sm:text-[16px] text-nowrap whitespace-pre">What's your email</p>}
            {currentStep === 4 && <p className="font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[#878787] text-[14px] sm:text-[16px]">What can we help you with</p>}
            {currentStep === 5 && <p className="font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[#878787] text-[14px] sm:text-[16px]">Confirm messsage</p>}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <StepIndicator step={currentStep} />
            {/* Exit button - hidden on mobile */}
            <div className="hidden sm:block">
              <ExitButton />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-[#131518] border-t border-[#6a6a6a] border-solid flex flex-col gap-[3px] items-start px-4 sm:px-6 lg:px-[30px] py-4 sm:py-6 lg:py-0 rounded-bl-[12px] sm:rounded-bl-[16px] lg:rounded-bl-[20px] rounded-br-[12px] sm:rounded-br-[16px] lg:rounded-br-[20px] shrink-0 w-full overflow-y-auto">
          {currentStep === 1 && (
            <>
              <input
                ref={nameInputRef}
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleEnter)}
                placeholder="Your name..."
                className="font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[18px] sm:text-[20px] lg:text-[24px] text-white w-full bg-transparent border-none outline-none placeholder:text-[#878787]"
              />
              <div className="flex items-center justify-between shrink-0 w-full pt-2 sm:pt-0">
                <div className="flex gap-[5px] items-center shrink-0">
                  <div className="bg-[#5e5e5e] flex items-center justify-center p-[4.8px] rounded-[42px] shrink-0 opacity-50 cursor-not-allowed">
                    <div className="flex items-center justify-center size-[14.4px]">
                      <ChevronUp className="size-[14.4px] rotate-[270deg] text-white" />
                    </div>
                  </div>
                  <NavButton onClick={handleNext} rotate />
                </div>
                <PleaseEnterButton onClick={handleEnter} />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <input
                ref={companyInputRef}
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleEnter)}
                placeholder="Your company..."
                className="font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[18px] sm:text-[20px] lg:text-[24px] text-white w-full bg-transparent border-none outline-none placeholder:text-[#878787]"
              />
              <div className="flex items-center justify-between shrink-0 w-full">
                <div className="flex gap-[5px] items-center shrink-0">
                  <NavButton onClick={handlePrevious} />
                  <NavButton onClick={handleNext} rotate />
                </div>
                <PleaseEnterButton onClick={handleEnter} />
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <input
                ref={emailInputRef}
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleEnter)}
                placeholder="Your email..."
                className="font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[18px] sm:text-[20px] lg:text-[24px] text-white w-full bg-transparent border-none outline-none placeholder:text-[#878787]"
              />
              <div className="flex items-center justify-between shrink-0 w-full">
                <div className="flex gap-[5px] items-center shrink-0">
                  <NavButton onClick={handlePrevious} />
                  <NavButton onClick={handleNext} rotate />
                </div>
                <PleaseEnterButton onClick={handleEnter} />
              </div>
            </>
          )}

          {currentStep === 4 && (
            <>
              <textarea
                ref={messageInputRef}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleEnter();
                  }
                }}
                placeholder="Your message..."
                rows={3}
                className="font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[18px] sm:text-[20px] lg:text-[24px] text-white w-full bg-transparent border-none outline-none placeholder:text-[#878787] resize-none"
              />
              <div className="flex items-center justify-between shrink-0 w-full">
                <div className="flex gap-[5px] items-center shrink-0">
                  <NavButton onClick={handlePrevious} />
                  <NavButton onClick={handleNext} rotate />
                </div>
                <PleaseEnterButton onClick={handleEnter} />
              </div>
            </>
          )}

          {currentStep === 5 && (
            <>
              <div className="flex flex-col gap-4 sm:gap-[24px] items-start shrink-0 w-full py-4 sm:py-[20px]">
                <div className="flex flex-col gap-2 sm:gap-[10px] items-start leading-normal shrink-0 text-[14px] sm:text-[16px] w-full">
                  <p className="font-['Manrope',sans-serif] font-medium shrink-0 text-[#878787] w-full">Name</p>
                  <p className="font-['Manrope',sans-serif] font-normal shrink-0 text-white w-full break-words">{formData.name || "—"}</p>
                </div>
                <div className="flex flex-col gap-2 sm:gap-[10px] items-start leading-normal shrink-0 text-[14px] sm:text-[16px] w-full">
                  <p className="font-['Manrope',sans-serif] font-medium shrink-0 text-[#878787] w-full">Company</p>
                  <p className="font-['Manrope',sans-serif] font-normal shrink-0 text-white w-full break-words">{formData.company || "—"}</p>
                </div>
                <div className="flex flex-col gap-2 sm:gap-[10px] items-start leading-normal shrink-0 text-[14px] sm:text-[16px] w-full">
                  <p className="font-['Manrope',sans-serif] font-medium shrink-0 text-[#878787] w-full">Email</p>
                  <p className="font-['Manrope',sans-serif] font-normal shrink-0 text-white w-full break-words">{formData.email || "—"}</p>
                </div>
                <div className="flex flex-col gap-2 sm:gap-[10px] items-start leading-normal shrink-0 text-[14px] sm:text-[16px] w-full">
                  <p className="font-['Manrope',sans-serif] font-medium shrink-0 text-[#878787] w-full">More info</p>
                  <p className="font-['Manrope',sans-serif] font-normal shrink-0 text-white w-full break-words">{formData.message || "—"}</p>
                </div>
              </div>
              <div className="flex items-center justify-between shrink-0 w-full pb-4 sm:pb-[20px] pt-2 sm:pt-0">
                <div className="flex gap-[5px] items-center shrink-0">
                  <NavButton onClick={handlePrevious} />
                  <div className="bg-[#5e5e5e] flex items-center justify-center p-[4.8px] rounded-[42px] shrink-0 opacity-50 cursor-not-allowed">
                    <div className="flex items-center justify-center size-[14.4px] rotate-[180deg] scale-y-[-100%]">
                      <ChevronUp className="size-[14.4px] rotate-[270deg] text-white" />
                    </div>
                  </div>
                </div>
                <PleaseEnterButton onClick={handleEnter} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

