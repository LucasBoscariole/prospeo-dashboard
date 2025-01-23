import { ITeamMember, ITeamPermissions, TeamData } from "../ITeam";

export interface TeamStore {
  teamData: TeamData | null;
  setTeamData: (teamData: TeamData) => void;
  updateTeamMemberPermissions: (
    userOid: string,
    newPermissions: ITeamPermissions
  ) => void;
  addTeamMember: (member: ITeamMember) => void;
  removeTeamMember: (userOid: string) => void;
}
