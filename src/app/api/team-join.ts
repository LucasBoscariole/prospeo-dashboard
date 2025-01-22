// pages/api/team-join.ts

import { NextApiRequest, NextApiResponse } from "next";

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

    const { team_oid } = req.body;

    if (!team_oid || typeof team_oid !== "string") {
      return res.status(400).json({
        req_status: false,
        error_toast:
          "Invalid request: 'team_oid' is required and must be a string.",
      });
    }

    if (team_oid === "1233") {
      return res.status(200).json({
        req_status: true,
        success_toast: "You joined the team.",
      });
    }

    return res.status(500).json({
      req_status: false,
      error_toast: "You were not invited to join this team.",
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
