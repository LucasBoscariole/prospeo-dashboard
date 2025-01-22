// pages/api/team-invite.ts
import { NextApiRequest, NextApiResponse } from "next";

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

    const { email, crm_management, billing_management, team_management } =
      req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        req_status: false,
        error_toast:
          "Invalid request: 'email' is required and must be a string.",
      });
    }

    if (
      typeof crm_management !== "boolean" ||
      typeof billing_management !== "boolean" ||
      typeof team_management !== "boolean"
    ) {
      return res.status(400).json({
        req_status: false,
        error_toast: "Invalid request: Permissions must be boolean values.",
      });
    }

    // Mock successful response
    return res.status(200).json({
        req_status: true,
        success_toast:
          `${email} was invited to your team. They have 72 hours to accept the invite.`,
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
