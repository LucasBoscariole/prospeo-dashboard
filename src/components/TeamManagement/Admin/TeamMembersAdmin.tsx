/* eslint-disable @next/next/no-img-element */
"use client";

import { useTeamStore } from "@/store/teamStore";
import {
  IAddMemberPermission,
  ITeamMember,
  ITeamPermissions,
} from "@/types/ITeam";
import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import { SystemLogs } from "../SystemLogs";
import toast from "react-hot-toast";
import { CRMModal } from "@/components/Modals/CRMModal";
import { CRMRemovalModal } from "@/components/Modals/CRMRemovalModal";
import { TeamServerClient } from "@/services/team_client.service";

export const TeamMembersAdmin = () => {
  const [openCRMModal, setOpenCRMModal] = useState<boolean>(false);
  const [openCRMRemovalModal, setOpenCRMRemovalModal] = useState<string | null>(
    null
  );
  const { teamData, updateTeamMemberPermissions, removeTeamMember } =
    useTeamStore();
  const currentSeats = teamData?.response?.seats?.current ?? 0;
  const maximumSeats = teamData?.response?.seats?.maximum ?? 0;
  const permissions: Partial<IAddMemberPermission>[] = [
    {
      title: "CRM Management",
      label: "crm",
    },
    {
      title: "Billing Management",
      label: "billing_management",
    },
    {
      title: "Team Management",
      label: "team_management",
    },
  ];

  const handleUpdatePermission = (
    key: keyof ITeamPermissions,
    id: string,
    value: boolean,
    pass: boolean = false
  ) => {
    if (key === "crm") {
      const crmCount = teamData?.response?.team_members.filter(
        (member) => member.permissions.crm
      ).length;

      if (crmCount === 1 && !value) {
        setOpenCRMModal(true);
        return;
      } else if (!pass  && !value) {
        setOpenCRMRemovalModal(id);
        return;
      }
    }

    const targetMember = teamData?.response?.team_members.find(
      (member) => member.user_oid === id
    );

    if (!targetMember) {
      toast.error("User not found");
      return;
    }

    const updatedPermissions: ITeamPermissions = {
      ...targetMember.permissions,
      [key]: !targetMember.permissions[key],
    };

    const allPermissionsFalse = Object.values(updatedPermissions).every(
      (value) => value === false
    );

    if (allPermissionsFalse) {
      toast.error(
        "A user must have at least one permission, try removing it if necessary."
      );
      return;
    }

    updateTeamMemberPermissions(id, updatedPermissions);
    toast.success("Permission updated successfully");
  };

  const handleLeave = async (id: string, isLeave: boolean) => {
    if (isLeave) {
      await TeamServerClient.teamLeave(true);
      window.location.reload();
    } else {
      await TeamServerClient.teamRemove(id);
    }
    removeTeamMember(id);
    toast.success("Member removed");
  };
  const handleCancelInvite = async (id: string) => {
    await TeamServerClient.teamCancel(id);
    removeTeamMember(id);
    toast.success("Member invite removed");
  };

  if (teamData?.response?.team_members.length === 0 || teamData?.response?.team_members === undefined) {
    return (
      <div className="mt-4 bg-white border-sidebar-border py-4 px-6 rounded-2xl flex items-center justify-between">
        <h3 className="text-black text-xl font-medium">No team members yet</h3>
        <div className="flex items-center gap-4">
          <span className="text-black text-xl font-medium">
            {currentSeats}/{maximumSeats} seats
          </span>
          <button className="red-button">+ Add seats</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <CRMModal open={openCRMModal} setOpen={setOpenCRMModal} />
      <CRMRemovalModal
        open={!!openCRMRemovalModal}
        setOpen={setOpenCRMRemovalModal}
        callback={() =>
          handleUpdatePermission("crm", openCRMRemovalModal ?? "", false, true)
        }
      />
      <div className="mt-4 bg-white border-sidebar-border py-4 rounded-2xl">
        <div className="flex items-center justify-between mb-4 px-6">
          <h3 className="text-black text-xl font-medium">Team members</h3>
          <div className="flex items-center gap-4">
            <span className="text-black text-xl font-medium">
              {currentSeats}/{maximumSeats} seats
            </span>
            <button className="red-button">+ Add seats</button>
            <button className="white-button">
              <span>View team usage</span>
              <img
                src="/images/icons/redirect.svg"
                alt="redirect"
                className="w-[14px] aspect-square object-scale-down"
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[0.25fr_0.25fr_0.20fr_0.1745fr_0.1255fr] gap-4 border-b border-sidebar-border">
          <span className="text-sm font-medium px-6 py-[11px] text-dark">
            Name
          </span>
          <span className="text-sm font-medium px-6 py-[11px] text-dark">
            Email
          </span>
          <span className="text-sm font-medium px-6 py-[11px] text-dark">
            Permission
          </span>
          <span className="text-sm font-medium px-6 py-[11px] text-dark">
            Actions
          </span>
          <span className="text-sm font-medium px-6 py-[11px] text-dark">
            Analytics
          </span>
        </div>

        {/* Table Rows */}
        {teamData?.response?.team_members.map(
          (member: ITeamMember, index: number) =>{ 
            return (
            <div
              key={index}
              className="grid grid-cols-[0.25fr_0.25fr_0.20fr_0.1745fr_0.1255fr] gap-4 py-2 border-b border-gray-100"
            >
              <span className="text-sm text-dark px-6 flex items-center">
                {member.name}
              </span>
              <span className="text-sm text-dark px-6 flex items-center">
                {member.email}
              </span>
              <div className="flex gap-2 text-sm text-dark px-6 flex-col py-1">
                {Object.entries(member.permissions).map(([key, value]) => {
                  return (
                    <button
                      key={key}
                      className="gap-2 flex items-center"
                      onClick={() =>
                        handleUpdatePermission(
                          key as keyof ITeamPermissions,
                          member?.user_oid,
                          !value
                        )
                      }
                    >
                      <div
                        className={clsx(
                          "checkbox-small",
                          value ? "active" : ""
                        )}
                      />
                      <span className="text-xs text-dark">
                        {permissions?.find(({ label }) => label === key)?.title}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="px-6 flex items-center">
                {member?.action === "leave" && index === 0 ? (
                  <button
                    className="bg-red-light-100  rounded-lg flex items-center justify-center text-red-default gap-2 font-medium !h-7 !text-xs !px-2"
                    onClick={() => handleLeave(member?.user_oid, true)}
                  >
                    Leave the team
                  </button>
                ) : member?.action === "leave" ? (
                  <button
                    className="bg-red-light-100 rounded-lg flex items-center justify-center text-red-default gap-2 font-medium !h-7 !text-xs !px-2"
                    onClick={() => handleLeave(member?.user_oid, false)}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    className="rounded-lg flex items-center justify-center gap-2 font-medium !text-dark !bg-[#F6F6F6] !h-7 !text-xs !px-2"
                    onClick={() => handleCancelInvite(member?.user_oid)}
                  >
                    Cancel invite
                  </button>
                )}
              </div>
              <div className="px-6 flex items-center">
                <Image
                  src="/images/icons/analytics.svg"
                  alt="analytics"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          )}
        )}

        {/* Bottom Navigation */}
        {teamData?.response?.team_members && teamData?.response?.team_members.length > 0 ? (
          <div className="flex justify-between items-center mt-4 px-4">
            <span className="text-base text-dark pl-6">
              1 - 3 of {teamData?.response?.team_members?.length}
            </span>
            <div className="flex items-center gap-2">
              <button>
                <Image
                  src={"/images/icons/chevron_left.svg"}
                  alt="chevron_left"
                  width={16}
                  height={16}
                />
              </button>
              <div className="flex gap-1">
                {Array.from({ length: 1 }, (_, i) => (
                  <button
                    key={i}
                    className={`text-base text-dark ${
                      i === 0 ? "font-bold" : "font-normal"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button>
                <Image
                  src={"/images/icons/chevron_right.svg"}
                  alt="chevron_right"
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <SystemLogs />
    </>
  );
};
