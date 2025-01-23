import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

  const canLeaveTeam = true;

  if (canLeaveTeam) {
    return NextResponse.json({
      req_status: true,
      success_toast: "You successfully left the team.",
    });
  } else {
    return NextResponse.json(
      {
        req_status: false,
        error_toast:
          "You cannot leave the team as you are the only member with team management and billing permissions inside it.",
      },
      { status: 500 }
    );
  }
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
