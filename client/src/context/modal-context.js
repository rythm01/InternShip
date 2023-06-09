import React, { useCallback, useEffect, useState } from "react";

const ModalContext = React.createContext();

const Modal = ({ modal, unSetModal }) => {
  useEffect(() => {
    const bind = (e) => {
      if (e.keyCode !== 27) {
        return;
      }

      if (
        document.activeElement &&
        ["INPUT", "SELECT"].includes(document.activeElement.tagName)
      ) {
        return;
      }

      unSetModal();
    };

    document.addEventListener("keyup", bind);
    return () => document.removeEventListener("keyup", bind);
  }, [modal, unSetModal]);

  console.log();

  return (
    <div
      className={
        window.location.pathname === "/subscriptions" ||
          window.location.pathname === "/home/my-buddies"
          ? "modal-addOn"
          : "modal"
      }
    >
      <button className="modal__close" onClick={unSetModal} />
      <div className="modal__inner">
        <button className="modal__close-btn" onClick={unSetModal}>
          <svg
            width="58"
            height="58"
            viewBox="0 0 58 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="29" cy="29" r="29" fill="#F5F5F5" />
            <circle
              cx="29"
              cy="29"
              r="28.5"
              stroke="black"
              strokeOpacity="0.05"
            />
            <path
              d="M20 38L38 20"
              stroke="#292D32"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M38 38L20 20"
              stroke="#292D32"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {modal}
      </div>
    </div>
  );
};

const ModalProvider = (props) => {
  const [modal, setModal] = useState();
  const unSetModal = useCallback(() => {
    setModal();
  }, [setModal]);

  return (
    <ModalContext.Provider value={{ unSetModal, setModal }} {...props}>
      {props.children}
      {modal && <Modal modal={modal} unSetModal={unSetModal}></Modal>}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = React.useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModal must be used within a UserProvider");
  }

  return context;
};

export { ModalProvider, useModal };
