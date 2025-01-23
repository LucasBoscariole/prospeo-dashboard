import React from "react";
import { Modal } from "./Modal";
import Image from "next/image";

export const CRMModal: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open}>
      <div className="w-full">
        <button onClick={handleClose} className="top-4 absolute right-4">
          <Image
            src="/images/icons/close.svg"
            alt="close"
            width={16}
            height={16}
          />
        </button>
        <h1 className="text-xl text-dark font-medium mb-1 text-left">
          You cannot remove this permission
        </h1>
        <p className="text-grey-800 text-sm text-left">
          At least one user needs to have team management permissions.
        </p>
      </div>
    </Modal>
  );
};
