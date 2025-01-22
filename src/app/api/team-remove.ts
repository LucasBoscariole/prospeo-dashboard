// pages/api/team-remove.ts

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

    const { user_oid } = req.body;

    if (!user_oid) {
      return res.status(400).json({
        req_status: false,
        error_toast: "Invalid request: 'user_oid' is required.",
      });
    }

    const currentUserOid = "current-user-oid";
    const isLastMember = false;

    if (user_oid === currentUserOid) {
      return res.status(400).json({
        req_status: false,
        error_toast: "You cannot remove yourself from the team.",
      });
    }

    if (isLastMember) {
      return res.status(400).json({
        req_status: false,
        error_toast: "The team cannot be left without members.",
      });
    }

    return res.status(200).json({
      req_status: true,
      success_toast: "The team member was removed successfully",
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
