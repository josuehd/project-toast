import React from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [toasts, setToasts] = React.useState([]);

  function formReset() {
    setMessage("");
    setVariant(VARIANT_OPTIONS[0]);
  }
  function handleDismiss(id) {
    setToasts((oldToasts) => oldToasts.filter((item) => item.id !== id));
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf toasts={toasts} />
      <form
        className={styles.controlsWrapper}
        onSubmit={(e) => {
          e.preventDefault();
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
          formReset();
        }}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(el) => setMessage(el.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variantOption) => {
              const id = `variant-${variantOption}`;
              return (
                <label key={id} htmlFor={id}>
                  <input
                    id={id}
                    type="radio"
                    name="variant"
                    value={variantOption}
                    checked={variantOption === variant}
                    onChange={(e) => {
                      setVariant(e.target.value);
                    }}
                  />
                  {variantOption}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
