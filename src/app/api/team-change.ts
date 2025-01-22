// pages/api/team-change.ts

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

    const {
      user_oid,
      email,
      crm_management,
      billing_management,
      team_management,
    } = req.body;

    if (!user_oid && !email) {
      return res.status(400).json({
        req_status: false,
        error_toast:
          "Invalid request. Either 'user_oid' or 'email' is required.",
      });
    }

    if (email) {
      if (email === "fdfd@gmail.com") {
        return res.status(200).json({
          req_status: true,
          success_toast: "The invited team member was updated successfully",
        });
      }
    }

    if (user_oid) {
      if (user_oid === "656ds5f6ds5dddd") {
        if (crm_management && billing_management && team_management) {
          return res.status(200).json({
            req_status: true,
            success_toast: "The team member was updated successfully",
          });
        } else {
          return res.status(500).json({
            req_status: false,
            error_toast:
              "You do not have the permissions to edit team members.",
          });
        }
      }
    }

    // Simulate server error for other cases
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
