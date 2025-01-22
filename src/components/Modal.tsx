import { IModal } from "@/types/IModal";
import React from "react";

export const Modal: React.FC<IModal> = ({ open, children }) => {
  if (!open) <></>;
  return (
    <div className="absolute inset-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
      <div className="w-[605px] bg-white border border-sidebar-border rounded-2xl p-8 flex flex-col gap-10 items-center">
        {children}
      </div>
    </div>
  );
};
