"use client";

import { createContext, useContext, useState } from "react";
import Modal from "@/app/components/shared/Modal";

interface ModalState {
  isOpen: boolean;
  type: "success" | "error";
  title: string;
  message: string;
}

const ModalContext = createContext<any>(null);

export const ModalProvider = ({ children }: any) => {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const showModal = (
    type: "success" | "error",
    title: string,
    message: string,
  ) => {
    setModal({ isOpen: true, type, title, message });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
