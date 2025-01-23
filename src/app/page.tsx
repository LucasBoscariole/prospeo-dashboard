import { AddTeamMembers } from "@/components/Modals/AddTeamMembers";
import { PlanModal } from "@/components/Modals/PlanModal";
import { TeamManagementWrapper } from "@/components/TeamManagement/TeamManagementWrapper";
import { TeamService } from "@/services/team.service";
import { TeamData } from "@/types/ITeam";

export default async function Home() {
  // Fetch team data server-side
  const teamDataAPI: TeamData = await TeamService.getTeam(1);

  return (
    <>
      <PlanModal isFreePlan={teamDataAPI?.response?.current_tier === "FREE" || teamDataAPI?.req_status === false} />
      <AddTeamMembers isOpen={teamDataAPI?.response?.team_members.length === 0 && teamDataAPI?.response?.current_tier !== "FREE"} />
      <TeamManagementWrapper teamDataAPI={teamDataAPI}/>
    </>
  );
}
