import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { team_oid } = body;

  const sessionToken = req.headers.get("X-PROSPEO-SESSION");

  if (!sessionToken) {
    return NextResponse.json(
      {
        req_status: false,
        error_toast: "Unauthorized: Missing session token.",
      },
      { status: 401 }
    );
  }

  if (!team_oid || typeof team_oid !== "string") {
    return NextResponse.json(
      {
        req_status: false,
        error_toast:
          "Invalid request: 'team_oid' is required and must be a string.",
      },
      { status: 400 }
    );
  }

  if (team_oid === "1233") {
    return NextResponse.json({
      req_status: true,
      success_toast: "You joined the team.",
    });
  }

  return NextResponse.json(
    {
      req_status: false,
      error_toast: "You were not invited to join this team.",
    },
    { status: 500 }
  );
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
