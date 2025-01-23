"use client"

import React, { useEffect } from "react";
import { TeamManagementAdmin } from "./TeamManagementAdmin";
import { useTeamStore } from "@/store/teamStore";
import { TeamData } from "@/types/ITeam";

export const TeamManagementWrapper: React.FC<{
  teamDataAPI: TeamData;
}> = ({ teamDataAPI }) => {
  const { teamData, setTeamData } = useTeamStore();

  useEffect(() => {
    setTeamData(teamDataAPI);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamDataAPI]);

  return (
    <div className="p-6">
      {teamData?.response?.permissions?.crm === true ? (
        <TeamManagementAdmin />
      ) : (
        <></>
      )}
    </div>
  );
};
