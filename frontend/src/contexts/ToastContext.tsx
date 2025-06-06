import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from "react";
import { FaExclamation, FaCheck } from "react-icons/fa";
import type { Error } from "../types/Error";

// Toast context props
type ToastContextProps = {
  showToast: (error: Error) => void;
};

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Toast state
  const [show, setShow] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Toast trigger handler
  const showToast = (error: Error) => {
    setError(error);
    setShow(true);

    // Hide after 3 seconds
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {error && (
        <div
          className={`absolute top-5 left-1/2 flex max-w-1/3 min-w-1/4 -translate-x-1/2 items-center gap-2 rounded-lg p-2 text-white transition-all duration-500 ${show ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"} ${error.type === "error" ? "bg-red-500" : "bg-green-600"} `}
        >
          {error.type === "error" ? (
            <FaExclamation size={20} />
          ) : (
            <FaCheck size={20} />
          )}
          <p>{error.message}</p>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
