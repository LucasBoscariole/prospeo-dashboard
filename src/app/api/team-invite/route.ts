import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, crm_management, billing_management, team_management } =
      await req.json();

    const session = req.headers.get("X-PROSPEO-SESSION");
    if (!session) {
      return NextResponse.json(
        {
          req_status: false,
          error_toast: "Unauthorized: Missing session token.",
        },
        { status: 401 }
      );
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          req_status: false,
          error_toast: "'email' is required and must be a string.",
        },
        { status: 400 }
      );
    }

    if (
      typeof crm_management !== "boolean" ||
      typeof billing_management !== "boolean" ||
      typeof team_management !== "boolean"
    ) {
      return NextResponse.json(
        {
          req_status: false,
          error_toast: "Invalid request: Permissions must be boolean values.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        req_status: true,
        success_toast: `${email} was invited to your team. They have 72 hours to accept the invite.`,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        req_status: false,
        error_toast: "Internal Server Error",
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
