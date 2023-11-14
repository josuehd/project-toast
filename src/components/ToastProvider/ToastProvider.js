import React, { useEffect } from "react";
import ToastShelf from "../ToastShelf";

export const ToastContext = React.createContext({});
function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

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

  useEffect(() => {
    function onEscapeDown(e) {
      console.log(e.key);
      if (e.key === "Escape") {
        setToasts([]);
      }
    }

    window.addEventListener("keydown", onEscapeDown);

    return () => window.removeEventListener("keydown", onEscapeDown);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastShelf toasts={toasts} handleDismiss={handleDismiss} />
    </ToastContext.Provider>
  );
}

export default ToastProvider;
