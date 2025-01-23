"use client";

import React, { useState } from "react";
import { Input } from "../Input";
import { IAddMemberPermission, ITeamPermissions } from "@/types/ITeam";
import clsx from "clsx";
import { useTeamStore } from "@/store/teamStore";
import toast from "react-hot-toast";
import { TeamServerClient } from "@/services/team_client.service";
import { Tooltip } from "../Tooltip";

export const AddTeamMember = () => {
  const [email, setEmail] = useState<string>("");
  const { addTeamMember, teamData } = useTeamStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await TeamServerClient.teamInvite(
      email,
      permissionAllowed.crm,
      permissionAllowed.billing_management,
      permissionAllowed.team_management
    );

    if (response.req_status) {
      addTeamMember({
        user_oid: (
          (teamData?.response?.team_members?.length ?? 0) + 1
        ).toString(),
        name: "",
        email: email,
        action: "cancel_invite",
        permissions: permissionAllowed,
      });
      console.log(response);
      toast.success(response.success_toast);
    } else {
      toast.error(response.error_toast);
    }
  };

  const [permissionAllowed, setPermissionsAllowed] = useState<ITeamPermissions>(
    {
      billing_management: false,
      crm: true,
      team_management: false,
    }
  );

  const permissions: IAddMemberPermission[] = [
    {
      title: "CRM management",
      tooltip:
        "Grant or restrict access to CRM tools. Manage who can view, edit, or delete customer relationship data.",
      label: "crm",
    },
    {
      title: "Billing management",
      tooltip:
        "Control who can access billing information and transactions. This includes permissions to view, modify, and manage invoices and payment methods.",
      label: "billing_management",
    },
    {
      title: "Team member management",
      tooltip:
        "Set permissions for managing team member roles and access rights. Decide who can add, remove, or modify team member profiles and permissions.",
      label: "team_management",
    },
  ];

  const togglePermission = (label: keyof ITeamPermissions) => {
    setPermissionsAllowed((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-dark font-medium">
          Enter email address
        </label>
        <div className="flex items-center gap-2">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
          <button className="red-button">Send invitation</button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <h3 className="text-grey-800 text-sm font-medium">Permissions:</h3>
        <div className="flex items-center gap-6">
          {permissions.map(({ title, label, tooltip }) => (
            <button
              key={label}
              type="button"
              className="flex items-center gap-2"
              onClick={() => togglePermission(label)}
            >
              <div
                className={clsx(
                  "checkbox",
                  permissionAllowed[label] === true ? "active" : ""
                )}
              />
              <span className="text-sm text-grey-800">{title}</span>
              <Tooltip>{tooltip}</Tooltip>
            </button>
          ))}
        </div>
      </div>
    </form>
  );
};
