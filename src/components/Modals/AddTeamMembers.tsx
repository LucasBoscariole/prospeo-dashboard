"use client"

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Modal } from "./Modal";

export const AddTeamMembers: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(isOpen);

  return (
    <Modal open={modalOpen}>
      <img
        src="/images/modal_image.png"
        alt="modal_image"
        className="h-[100px] w-auto object-scale-down"
      />
      <div>
        <h1 className="text-xl text-dark font-medium mb-1 text-center">
          Get started and invite members to your team!
        </h1>
        <p className="text-grey-800 text-sm text-center">
          Give access to our fresh contact data to your colleagues
        </p>
      </div>
      <button
        className="main-button !h-[49px]"
        onClick={() => setModalOpen(false)}
      >
        Get more seats
      </button>
    </Modal>
  );
};
