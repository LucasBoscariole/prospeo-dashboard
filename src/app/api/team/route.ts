import { ITeamMember, TeamData } from "@/types/ITeam";
import { NextResponse } from "next/server";

const mockData: TeamData = {
  req_status: true,
  response: {
    current_tier: "PAID",
    seats: {
      current: 0,
      maximum: 3,
    },
    permissions: {
      crm: true,
      team_management: true,
      billing_management: true,
    },
    team_members: [],
    pagination: {
      current_page: 1,
      from: 1,
      to: 1,
      per_page: 25,
      total_page: 1,
      total_count: 1,
    },
  },
};

const mockTeamMembers: ITeamMember[] = [
  {
    user_oid: "1",
    name: "Jon Condouret",
    email: "jon@prospeo.io",
    action: "leave",
    permissions: {
      crm: false,
      team_management: true,
      billing_management: true,
    },
  },
  {
    user_oid: "2",
    name: "Marita Man",
    email: "marita@team.com",
    action: "cancel_invite",
    permissions: {
      crm: false,
      team_management: true,
      billing_management: true,
    },
  },
  {
    user_oid: "3",
    name: "Marito Naj",
    email: "marito@gmail.com",
    action: "leave",
    permissions: {
      crm: true,
      team_management: false,
      billing_management: true,
    },
  },
];

export async function POST(request: Request) {
  const session = request.headers.get("x-prospeo-session");

  mockData.response.current_tier = session ? "PAID" : "FREE";

  if (!session) {
    return NextResponse.json(
      {
        req_status: false,
        error_toast: "Your plan doesn't support team.",
      },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { page } = body;

  if (typeof page !== "number" || page < 1) {
    return NextResponse.json(
      {
        req_status: false,
        error_toast: "Invalid request: 'page' must be a positive number.",
      },
      { status: 400 }
    );
  }

  mockData.response.permissions =
    session === "admin"
      ? {
          crm: true,
          team_management: true,
          billing_management: true,
        }
      : {
          crm: false,
          team_management: true,
          billing_management: true,
        };
  mockData.response.team_members = session === "admin" ? [] : mockTeamMembers;

  return NextResponse.json(mockData, { status: 200 });
}

export async function OPTIONS() {
  return NextResponse.json(
    {
      req_status: false,
      error_toast: "Method Not Allowed",
    },
    { status: 405 }
  );
}
