import React from "react";
import { Modal } from "./Modal";
import Image from "next/image";

export const CRMRemovalModal: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<string | null>;
  callback: () => void;
}> = ({ open, setOpen, callback }) => {
  const handleClose = () => {
    setOpen(null);
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
          Are you sure?
        </h1>
        <p className="text-grey-800 text-sm text-left">
          By removing this team management permission, the user will lose access
          to this page and won&apos;t be able to regain access to it.
          <br />
          <br />
          User will have to ask another team admin to give you permission again.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <button onClick={handleClose} className="white-button">
            Keep permissions
          </button>
          <button
            onClick={() => {
              callback();
              handleClose();
            }}
            className="bg-red-light-100  rounded-lg flex items-center justify-center text-red-default gap-2 font-medium h-10 text-sm"
          >
            Continue
          </button>
        </div>
      </div>
    </Modal>
  );
};
