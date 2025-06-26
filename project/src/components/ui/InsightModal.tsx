import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface InsightModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  miniChart?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
}

export const InsightModal: React.FC<InsightModalProps> = ({ open, onClose, title, miniChart, description, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && focusable && focusable.length > 0) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    first?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60" role="dialog" aria-modal="true" aria-label={title || 'Insight Modal'}>
      <div ref={modalRef} className="bg-white dark:bg-[#1E2533] rounded-xl shadow-2xl max-w-lg w-full mx-4 p-6 relative animate-fade-in focus:outline-none" tabIndex={-1}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
        {title && <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>}
        {miniChart && <div className="mb-4">{miniChart}</div>}
        {description && <p className="mb-4 text-gray-600 dark:text-gray-300">{description}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}; 