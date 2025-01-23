/* eslint-disable @next/next/no-img-element */
import React from "react";
import { AddTeamMember } from "./AddTeamMember";
import { TeamMembersAdmin } from "./TeamMembersAdmin";

export const TeamManagementAdmin: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="px-2 text-2xl font-semibold text-dark">
          Team Management
        </h1>
        <button className="white-button">
          <span>Manage team subscription</span>
          <img
            src="/images/icons/redirect.svg"
            alt="redirect"
            className="w-[14px] aspect-square object-scale-down"
          />
        </button>
      </div>

      <div className="bg-white border border-sidebar-border rounded-2xl p-6">
        <h2 className="text-xl font-medium text-dark mb-8">Add a member</h2>
        <AddTeamMember />
      </div>
      
      <TeamMembersAdmin />
    </>
  );
};
