export interface TeamData {
  req_status: boolean;
  response: ITeamResponse;
}

export interface ITeamResponse {
  current_tier: "FREE" | "PAID";
  seats: ITeamSeats;
  permissions: ITeamPermissions;
  team_members: ITeamMember[];
  pagination: Pagination;
}

export interface ITeamSeats {
  current: number;
  maximum: number;
}

export interface ITeamPermissions {
  crm: boolean;
  team_management: boolean;
  billing_management: boolean;
}

export interface Pagination {
  current_page: number;
  from: number;
  to: number;
  per_page: number;
  total_page: number;
  total_count: number;
}

export interface ITeamMember {
  user_oid: string;
  name: string;
  email: string;
  action: "leave" | "cancel_invite";
  permissions: ITeamPermissions;
}
export interface IAddMemberPermission {
  title: string;
  tooltip: string;
  label: keyof ITeamPermissions;
}