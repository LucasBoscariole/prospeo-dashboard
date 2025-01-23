import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

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

  const { user_oid } = body;

  if (!user_oid) {
    return NextResponse.json(
      {
        req_status: false,
        error_toast: "Invalid request: 'user_oid' is required.",
      },
      { status: 400 }
    );
  }

  const currentUserOid = "current-user-oid";
  const isLastMember = false;

  if (user_oid === currentUserOid) {
    return NextResponse.json(
      {
        req_status: false,
        error_toast: "You cannot remove yourself from the team.",
      },
      { status: 400 }
    );
  }

  if (isLastMember) {
    return NextResponse.json(
      {
        req_status: false,
        error_toast: "The team cannot be left without members.",
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      req_status: true,
      success_toast: "The team member was removed successfully",
    },
    { status: 200 }
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
