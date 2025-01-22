// pages/api/team-cancel.ts

import { NextApiRequest, NextApiResponse } from "next";

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// API handler
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Validate the "X-PROSPEO-SESSION" header
    const session = req.headers["x-prospeo-session"];
    if (!session) {
      return res.status(401).json({
        req_status: false,
        error_toast: "Unauthorized: Missing session token.",
      });
    }

    // Validate the request body
    const { email } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        req_status: false,
        error_toast: "Invalid email provided.",
      });
    }

    if (email === "tocancel@gmail.com") {
      return res.status(200).json({
        req_status: true,
        success_toast: "The invite was cancelled",
      });
    }

    return res.status(500).json({
      req_status: false,
      error_toast: "Something went wrong. Please contact the support.",
    });
  } else {
    // Handle unsupported methods
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      req_status: false,
      error_toast: "Method Not Allowed",
    });
  }
}
