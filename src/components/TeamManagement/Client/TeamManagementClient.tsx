import React from "react";
import { TeamMembersClient } from "./TeamMembersClient";

export const TeamManagementClient: React.FC = () => {
  return (
    <>
      <div className="flex mb-8 flex-col gap-6">
        <h1 className="px-2 text-2xl font-semibold text-dark">
          Team Management
        </h1>
        <p className="text-base text-dark">
          You do not have team management permissions. Ask an admin to change
          your permissions.
        </p>
      </div>

      <TeamMembersClient />
    </>
  );
};
