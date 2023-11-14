import React, { useEffect } from "react";
import ToastShelf from "../ToastShelf";
import useKeyDown from "../../hooks/useKeyDown";

export const ToastContext = React.createContext({});
function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);
  const handleCallback = React.useCallback(() => {
    setToasts([]);
  }, [setToasts]);
  useKeyDown("Escape", handleCallback);

  function handleDismiss(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nextToasts);
  }

  function showToast({ message, variant }) {
    const id = crypto.randomUUID();

    setToasts([
      ...toasts,
      {
        id,
        message,
        variant,
        handleDismiss: () => handleDismiss(id),
      },
    ]);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastShelf toasts={toasts} handleDismiss={handleDismiss} />
    </ToastContext.Provider>
  );
}

export default ToastProvider;
