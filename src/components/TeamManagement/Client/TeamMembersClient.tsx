/* eslint-disable @next/next/no-img-element */
"use client";

import { useTeamStore } from "@/store/teamStore";
import { IAddMemberPermission, ITeamMember } from "@/types/ITeam";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { SystemLogs } from "../SystemLogs";
import { TeamServerClient } from "@/services/team_client.service";
import Cookies from "js-cookie";

export const TeamMembersClient = () => {
  const { teamData } = useTeamStore();
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

  const handleLeave = async () => {
    await TeamServerClient.teamLeave(true);
    Cookies.remove("x-prospeo-session");
    window.location.reload();
  };

  return (
    <>
      <div className="mt-4 bg-white border-sidebar-border py-4 rounded-2xl">
        <div className="flex items-center justify-between mb-4 px-6">
          <h3 className="text-black text-xl font-medium">Team members</h3>
          <div className="flex items-center gap-4">
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
          (member: ITeamMember, index: number) => {
            const isCurrentUser = index === 0
            return (
              <div
                key={index}
                className="grid grid-cols-[0.25fr_0.25fr_0.20fr_0.1745fr_0.1255fr] gap-4 py-2 border-b border-gray-100 h-[84px]"
              >
                <span className="text-sm text-dark px-6 flex items-center">
                  {member.name}
                </span>
                <span className="text-sm text-dark px-6 flex items-center">
                  {member.email}
                </span>
                <div className="flex gap-2 text-sm text-dark px-6 flex-col py-1">
                  {isCurrentUser ? (
                    Object.entries(member.permissions).map(([key, value]) => {
                      return (
                        <div key={key} className="gap-2 flex items-center">
                          <div
                            className={clsx(
                              "checkbox-small",
                              value
                                ? "active !bg-[#747474] !border-[#747474]"
                                : ""
                            )}
                          />
                          <span className="text-xs text-dark">
                            {
                              permissions?.find(({ label }) => label === key)
                                ?.title
                            }
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
                <div className="px-6 flex items-center">
                  {isCurrentUser ? (
                    <button
                      className="bg-red-light-100  rounded-lg flex items-center justify-center text-red-default gap-2 font-medium !h-7 !text-xs !px-2"
                      onClick={() => handleLeave()}
                    >
                      Leave the team
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="px-6 flex items-center">
                  {isCurrentUser ? (
                    <Image
                      src="/images/icons/analytics.svg"
                      alt="analytics"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          }
        )}

        {/* Bottom Navigation */}
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
      </div>
      <SystemLogs />
    </>
  );
};
