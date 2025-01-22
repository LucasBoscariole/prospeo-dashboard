// pages/api/team.ts

import { NextApiRequest, NextApiResponse } from "next";

// Mock data for the response
const mockData = {
  req_status: true,
  response: {
    seats: {
      current: 1,
      maximum: 3,
    },
    permissions: {
      crm: true,
      team_management: true,
      billing_management: true,
    },
    team_members: [
      {
        user_oid: "656ds5f6ds5dddd",
        name: "Jon Condouret (you)",
        email: "jon@prospeo.io",
        action: "leave",
        permissions: {
          crm: true,
          team_management: true,
          billing_management: true,
        },
      },
      {
        user_oid: null,
        name: "Laura Nina",
        email: "laura@prospeo.io",
        action: "cancel_invite",
        permissions: {
          crm: true,
          team_management: true,
          billing_management: true,
        },
      },
      {
        user_oid: "656ds5f6ds5dddd",
        name: "Jaron Nad",
        email: "ogg@prospeo.io",
        action: "remove",
        permissions: {
          crm: true,
          team_management: true,
          billing_management: true,
        },
      },
    ],
    pagination: {
      current_page: 1,
      from: 1,
      to: 1,
      per_page: 25,
      total_page: 1,
      total_count: 1,
    },
  },
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

    if (session === "unauthorized")
      return res.status(500).json({
        req_status: false,
        error_toast: "Your plan doesnt support team.",
      });

    // Validate the request body
    const { page } = req.body;
    if (typeof page !== "number" || page < 1) {
      return res.status(400).json({
        req_status: false,
        error_toast: "Invalid request: 'page' must be a positive number.",
      });
    }

    // Return mock data
    return res.status(200).json(mockData);
  } else {
    // Handle unsupported methods
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      req_status: false,
      error_toast: "Method Not Allowed",
    });
  }
}
