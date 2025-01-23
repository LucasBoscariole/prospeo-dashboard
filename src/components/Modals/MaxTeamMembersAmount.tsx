"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Modal } from "./Modal";

export const MaxTeamMembersAmount: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}> = ({ open, setOpen }) => {
  const handleSeeOurPlans = () => {
    setOpen(false);
  };

  return (
    <Modal open={open}>
      <img
        src="/images/modal_image.png"
        alt="modal_image"
        className="h-[100px] w-auto object-scale-down"
      />
      <div>
        <h1 className="text-xl text-dark font-medium mb-1 text-center">
          Maximum team amount added.
        </h1>
        <p className="text-grey-800 text-sm text-center">
          Upgrade now and invite more colleagues!
        </p>
      </div>
      <button className="main-button !h-[49px]" onClick={handleSeeOurPlans}>
        See our plans
      </button>
    </Modal>
  );
};
