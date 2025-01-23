import { NextResponse } from "next/server";

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

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

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      {
        req_status: false,
        error_toast: "Invalid email provided.",
      },
      { status: 400 }
    );
  }

  if (email === "tocancel@gmail.com") {
    return NextResponse.json({
      req_status: true,
      success_toast: "The invite was cancelled",
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
