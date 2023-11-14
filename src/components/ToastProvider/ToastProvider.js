import React from "react";
import ToastShelf from "../ToastShelf";

export const ToastContext = React.createContext(null);
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

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastShelf toasts={toasts} handleDismiss={handleDismiss} />
    </ToastContext.Provider>
  );
}

export default ToastProvider;
