"use client"

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Modal } from "./Modal";
import Cookies from "js-cookie";

export const PlanModal: React.FC<{ isFreePlan: boolean }> = ({
  isFreePlan,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(isFreePlan);

  const handleSeeOurPlans = () => {
    Cookies.set("x-prospeo-session", "admin", { expires: 1 });
    setModalOpen(false);
    window.location.reload();
  };

  return (
    <Modal open={modalOpen}>
      <img
        src="/images/modal_image.png"
        alt="modal_image"
        className="h-[100px] w-auto object-scale-down"
      />
      <div>
        <h1 className="text-xl text-dark font-medium mb-1 text-center">
          Team is not available in the Free plan.
        </h1>
        <p className="text-grey-800 text-sm text-center">
          Upgrade now and invite your colleagues!
        </p>
      </div>
      <button className="main-button !h-[49px]" onClick={handleSeeOurPlans}>
        See our plans
      </button>
    </Modal>
  );
};
