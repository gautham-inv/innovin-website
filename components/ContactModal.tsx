"use client";

import { useState, useEffect, useRef, createContext, useContext, ReactNode } from "react";
import { ChevronUp, ArrowRight, X, CheckCircle } from "lucide-react";

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

// Country codes for phone numbers
const countryCodes = [
  { code: "+1", country: "US/CA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+971", country: "AE", flag: "🇦🇪" },
  { code: "+65", country: "SG", flag: "🇸🇬" },
];

function ContactModal() {
  const { isOpen, closeModal } = useContactModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
      setErrors({});
      setShowSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Focus input on step change
  useEffect(() => {
    if (isOpen && !showSuccess) {
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
  }, [currentStep, isOpen, showSuccess]);

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

  // Validate current step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      } else if (formData.name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }
    } else if (step === 2) {
      if (!formData.company.trim()) {
        newErrors.company = "Company name is required";
      } else if (formData.company.trim().length < 2) {
        newErrors.company = "Company name must be at least 2 characters";
      }
    } else if (step === 3) {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    } else if (step === 4) {
      if (!formData.message.trim()) {
        newErrors.message = "Message is required";
      } else if (formData.message.trim().length < 10) {
        newErrors.message = "Message must be at least 10 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (!isOpen) return null;

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < 5) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleEnter = async () => {
    if (currentStep < 5) {
      handleNext();
    } else {
      // Submit form
      if (!validateStep(5)) return;

      setIsSubmitting(true);
      try {
        const response = await fetch("/api/contact-messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: `Company: ${formData.company}\n\nMessage: ${formData.message}`,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
          console.error("Contact form submission error:", errorData);

          // Extract error message from response
          let errorMessage = "Failed to submit message. Please try again later.";

          if (errorData.error) {
            errorMessage = errorData.error;
          } else if (errorData.details) {
            if (typeof errorData.details === 'string') {
              errorMessage = errorData.details;
            } else if (errorData.details.message) {
              errorMessage = errorData.details.message;
            } else if (typeof errorData.details === 'object') {
              errorMessage = errorData.details.message || errorData.details.error || errorMessage;
            }
          }

          setErrors({ submit: errorMessage });
          setIsSubmitting(false);
          return; // Don't throw, just show error
        }

        setShowSuccess(true);
        setIsSubmitting(false);

        // Track form submission
        const { trackEvent } = await import("@/lib/analytics");
        trackEvent("contact_form_submit", "form", "contact_modal");

        // Close modal after 3 seconds
        setTimeout(() => {
          setFormData({ name: "", company: "", email: "", message: "" });
          setCurrentStep(1);
          setShowSuccess(false);
          closeModal();
        }, 3000);
      } catch (error) {
        console.error("Error submitting contact form:", error);
        setErrors({ submit: "Failed to submit message. Please try again." });
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
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
        disabled={isSubmitting}
        className="relative shrink-0 size-[20px] sm:size-[24px] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Enter"
      >
        <ArrowRight className="size-[18px] sm:size-[20px] text-[#ababab]" />
      </button>
    </div>
  );

  return (
    // NOTE: changed alignment for small screens to place modal in the upper half (items-start + top padding).
    // Also changed outer onClick to simply closeModal() — the modal itself stops propagation so clicks inside won't bubble up.
    <div
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-2 sm:p-4 lg:p-6 pt-8"
      onClick={() => {
        // Any click that reaches this wrapper is outside the modal (modal stops propagation), so close.
        closeModal();
      }}
    >
      {/* Backdrop with reduced brightness */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative mt-10 sm:mt-0 bg-[#131518] rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] w-full max-w-[680px] shadow-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with exit button - hidden on mobile */}
        <div className="bg-[#131518] flex flex-col sm:flex-row gap-2 sm:gap-[361px] min-h-[54px] h-auto sm:h-[54px] items-start sm:items-center px-4 sm:px-[30px] py-3 sm:py-[10px] rounded-tl-[12px] sm:rounded-tl-[16px] lg:rounded-tl-[20px] rounded-tr-[12px] sm:rounded-tr-[16px] lg:rounded-tr-[20px] shrink-0 relative">
          <div className="flex-1 w-full sm:w-auto">
            {!showSuccess && currentStep === 1 && <p className="font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[#878787] text-[14px] sm:text-[16px] text-nowrap whitespace-pre">What's your name?</p>}
            {!showSuccess && currentStep === 2 && <p className="font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[#878787] text-[14px] sm:text-[16px] text-nowrap whitespace-pre">What's your company name</p>}
            {!showSuccess && currentStep === 3 && <p className="font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[#878787] text-[14px] sm:text-[16px] text-nowrap">What's your email</p>}
            {!showSuccess && currentStep === 4 && <p className="font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[#878787] text-[14px] sm:text-[16px] text-nowrap whitespace-nowrap lg:whitespace-nowrap">What can we help you with</p>}
            {!showSuccess && currentStep === 5 && <p className="font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[#878787] text-[14px] sm:text-[16px]">Confirm messsage</p>}
            {showSuccess && <p className="font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[#66c2e2] text-[14px] sm:text-[16px]">Thank you!</p>}
          </div>
        </div>

        {/* Content */}
        <div className="bg-[#131518] border-t border-[#6a6a6a] border-solid flex flex-col gap-[3px] items-start px-4 sm:px-6 lg:px-[30px] py-4 sm:py-6 lg:py-0 rounded-bl-[12px] sm:rounded-bl-[16px] lg:rounded-bl-[20px] rounded-br-[12px] sm:rounded-br-[16px] lg:rounded-br-[20px] shrink-0 w-full overflow-y-auto">
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12 gap-4 sm:gap-6 w-full">
              <CheckCircle className="size-12 sm:size-16 text-[#66c2e2]" />
              <p className="font-['Manrope',sans-serif] font-medium text-white text-center text-lg sm:text-xl lg:text-2xl">
                We'll reach out to you soon!
              </p>
              <p className="font-['Manrope',sans-serif] font-normal text-[#878787] text-center text-sm sm:text-base">
                Thank you for contacting us. We'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <>
              {currentStep === 1 && (
                <>
                  <input
                    ref={nameInputRef}
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, handleEnter)}
                    placeholder="Your name..."
                    className={`font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[18px] sm:text-[20px] lg:text-[24px] text-white w-full bg-transparent border-none outline-none placeholder:text-[#878787] ${
                      errors.name ? "text-red-400" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.name}</p>
                  )}
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
                    className={`font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[18px] sm:text-[20px] lg:text-[24px] text-white w-full bg-transparent border-none outline-none placeholder:text-[#878787] ${
                      errors.company ? "text-red-400" : ""
                    }`}
                  />
                  {errors.company && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.company}</p>
                  )}
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
                    placeholder="your.email@example.com"
                    className={`font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[18px] sm:text-[20px] lg:text-[24px] text-white w-full bg-transparent border-none outline-none placeholder:text-[#878787] ${
                      errors.email ? "text-red-400" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.email}</p>
                  )}
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
                    className={`font-['Manrope',sans-serif] font-medium leading-[1.2] sm:leading-[60px] shrink-0 text-[18px] sm:text-[20px] lg:text-[24px] text-white w-full bg-transparent border-none outline-none placeholder:text-[#878787] resize-none ${
                      errors.message ? "text-red-400" : ""
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.message}</p>
                  )}
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
                  {errors.submit && (
                    <p className="text-red-400 text-xs sm:text-sm mb-2">{errors.submit}</p>
                  )}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
