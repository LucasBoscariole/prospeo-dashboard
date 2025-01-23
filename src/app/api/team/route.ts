import { NextResponse } from "next/server";

const mockData = {
  req_status: true,
  response: {
    current_tier: "",
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
