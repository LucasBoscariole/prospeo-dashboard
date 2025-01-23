import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const {
    user_oid,
    email,
    // crm_management,
    // billing_management,
    // team_management,
  } = body;

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

  if (!user_oid && !email) {
    return NextResponse.json(
      {
        req_status: false,
        error_toast:
          "Invalid request. Either 'user_oid' or 'email' is required.",
      },
      { status: 400 }
    );
  }

  if (email) {
    return NextResponse.json({
      req_status: true,
      success_toast: "The invited team member was updated successfully",
    });
  }

  if (user_oid) {
    return NextResponse.json({
      req_status: true,
      success_toast: "The team member was updated successfully",
    });
  }

  return NextResponse.json(
    {
      req_status: false,
      error_toast: "Something went wrong. Please contact the support.",
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
