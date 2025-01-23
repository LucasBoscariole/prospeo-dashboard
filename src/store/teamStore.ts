import { ITeamMember, ITeamPermissions, TeamData } from "@/types/ITeam";
import { TeamStore } from "@/types/store/Team";
import { create } from "zustand";

export const useTeamStore = create<TeamStore>((set) => ({
  teamData: null,
  setTeamData: (teamData: TeamData) => set({ teamData }),

  updateTeamMemberPermissions: (
    userOid: string,
    newPermissions: ITeamPermissions
  ) => {
    set((state) => {
      if (!state.teamData) return state;

      const updatedTeamMembers = state.teamData.response.team_members.map(
        (member) =>
          member.user_oid === userOid
            ? { ...member, permissions: newPermissions }
            : member
      );

      return {
        teamData: {
          ...state.teamData,
          response: {
            ...state.teamData.response,
            team_members: updatedTeamMembers,
          },
        },
      };
    });
  },

  addTeamMember: (member: ITeamMember) => {
    set((state) => {
      if (!state.teamData) return state;

      return {
        teamData: {
          ...state.teamData,
          response: {
            ...state.teamData.response,
            seats: {
              current: state.teamData.response?.seats?.current + 1,
              maximum: state.teamData.response?.seats.maximum,
            },
            team_members: [...state.teamData.response.team_members, member],
          },
        },
      };
    });
  },

  removeTeamMember: (userOid: string) => {
    set((state) => {
      if (!state.teamData) return state;

      const updatedTeamMembers = state.teamData.response.team_members.filter(
        (member) => member.user_oid !== userOid
      );

      return {
        teamData: {
          ...state.teamData,
          response: {
            ...state.teamData.response,
            seats: {
              current: state.teamData.response?.seats?.current - 1,
              maximum: state.teamData.response?.seats.maximum,
            },
            team_members: updatedTeamMembers,
          },
        },
      };
    });
  },
}));
