// pages/api/team-leave.ts

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

    const canLeaveTeam = true;

    if (canLeaveTeam) {
      return res.status(200).json({
        req_status: true,
        success_toast: "You successfully left the team.",
      });
    } else {
      return res.status(500).json({
        req_status: false,
        error_toast:
          "You cannot leave the team as you are the only member with team management and billing permissions inside it.",
      });
    }
  } else {
    // Handle unsupported methods
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      req_status: false,
      error_toast: "Method Not Allowed",
    });
  }
}
