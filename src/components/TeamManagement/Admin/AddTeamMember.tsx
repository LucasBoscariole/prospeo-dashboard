"use client";

import React, { useState } from "react";
import { Input } from "../../Input";
import {
  IAddMemberPermission,
  ITeamMember,
  ITeamPermissions,
} from "@/types/ITeam";
import clsx from "clsx";
import { useTeamStore } from "@/store/teamStore";
import toast from "react-hot-toast";
import { TeamServerClient } from "@/services/team_client.service";
import { Tooltip } from "../../Tooltip";
import { MaxTeamMembersAmount } from "@/components/Modals/MaxTeamMembersAmount";

export const AddTeamMember = () => {
  const [email, setEmail] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { addTeamMember, teamData } = useTeamStore();
  const namesMock = ["Lucas (you)", "Test", "Test again"];
  const actionMock = ["leave", "cancel_invite", "leave"];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      (teamData?.response?.seats?.current ?? 0) >=
      (teamData?.response?.seats?.maximum ?? 1)
    ) {
      toast.error("Maximum seats reached.");
      setOpenModal(true);
      return;
    }
    const hasEmail = teamData?.response?.team_members.find(
      ({ email: em }) => em === email
    );
    if (hasEmail) {
      toast.error("Email already on the team!");
      return;
    }

    const response = await TeamServerClient.teamInvite(
      email,
      permissionAllowed.crm,
      permissionAllowed.billing_management,
      permissionAllowed.team_management
    );

    if (response.req_status) {
      addTeamMember({
        user_oid: (
          Math.random() * 2120
        ).toString(),
        name: namesMock[teamData?.response?.team_members?.length ?? 0],
        email: email,
        action: actionMock[
          teamData?.response?.team_members?.length ?? 0
        ] as ITeamMember["action"],
        permissions: permissionAllowed,
      });
      toast.success(response.success_toast);
    } else {
      toast.error(response.error_toast);
    }
  };

  const [permissionAllowed, setPermissionsAllowed] = useState<ITeamPermissions>(
    {
      crm: true,
      team_management: false,
      billing_management: false,
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
    <>
      <MaxTeamMembersAmount open={openModal} setOpen={setOpenModal} />
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
    </>
  );
};
