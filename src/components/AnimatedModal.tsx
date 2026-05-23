import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AnimatedModalContextType {
  open: boolean;
  setOpen: (value: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
  toggle: () => void;
}

const AnimatedModalContext = createContext<AnimatedModalContextType | undefined>(undefined);

export function useAnimatedModal() {
  const context = useContext(AnimatedModalContext);
  if (!context) {
    throw new Error('useAnimatedModal must be used within an AnimatedModal provider');
  }
  return context;
}

interface AnimatedModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  closeOnEsc?: boolean;
  onChange?: (open: boolean) => void;
  children: ReactNode;
}

export function AnimatedModal({
  open: controlledOpen,
  defaultOpen = false,
  closeOnEsc = true,
  onChange,
  children,
}: AnimatedModalProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? !!controlledOpen : internalOpen;

  const setOpen = (value: boolean) => {
    if (!isControlled) {
      setInternalOpen(value);
    }
    onChange?.(value);
  };

  const openModal = () => {
    if (open) return;
    setOpen(true);
  };

  const closeModal = () => {
    if (!open) return;
    setOpen(false);
  };

  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!closeOnEsc) return;
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, closeOnEsc]);

  const value = { open, setOpen, openModal, closeModal, toggle };

  return (
    <AnimatedModalContext.Provider value={value}>
      {children}
    </AnimatedModalContext.Provider>
  );
}

interface AnimatedModalTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function AnimatedModalTrigger({ children, className = "", onClick, ...props }: AnimatedModalTriggerProps) {
  const { openModal } = useAnimatedModal();
  return (
    <div 
      onClick={(e) => { 
        e.stopPropagation(); 
        onClick?.(e); 
        openModal(); 
      }} 
      className={`cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AnimatedModalContent({ children }: { children: ReactNode }) {
  const { open, closeModal } = useAnimatedModal();

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { e.stopPropagation(); closeModal(); }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative z-55 w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800/80 bg-black p-6 shadow-2xl text-slate-200"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface AnimatedModalCloseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function AnimatedModalClose({ children, className = "", onClick, ...props }: AnimatedModalCloseProps) {
  const { closeModal } = useAnimatedModal();
  return (
    <div 
      onClick={(e) => { 
        e.stopPropagation(); 
        onClick?.(e); 
        closeModal(); 
      }} 
      className={`cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
