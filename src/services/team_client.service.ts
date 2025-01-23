import { API_URL } from "@/constants/url";
import Cookies from "js-cookie";

export class TeamServerClient {
  static async request(endpoint: string, data: object) {
    const sessionToken = Cookies.get("x-prospeo-session") || "";

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-PROSPEO-SESSION": sessionToken,
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      return {
        req_status: false,
        error_toast:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      };
    }
  }

  static async teamRemove(user_oid: string) {
    if (!user_oid) {
      return { req_status: false, error_toast: "'user_oid' is required." };
    }
    return this.request("/team-remove", { user_oid });
  }

  static async teamLeave(leave: boolean) {
    if (typeof leave !== "boolean") {
      return {
        req_status: false,
        error_toast: "'leave' is required and must be a boolean.",
      };
    }

    const canLeaveTeam = true;
    if (!canLeaveTeam) {
      return {
        req_status: false,
        error_toast:
          "You cannot leave the team as you are the only member with team management and billing permissions inside it.",
      };
    }

    return this.request("/team-leave", { leave });
  }

  static async teamJoin(team_oid: string) {
    if (!team_oid || typeof team_oid !== "string") {
      return {
        req_status: false,
        error_toast: "'team_oid' is required and must be a string.",
      };
    }
    return this.request("/team-join", { team_oid });
  }

  static async teamInvite(
    email: string,
    crm_management: boolean,
    billing_management: boolean,
    team_management: boolean
  ) {
    if (!email || typeof email !== "string") {
      return {
        req_status: false,
        error_toast: "'email' is required and must be a string.",
      };
    }

    if (
      typeof crm_management !== "boolean" ||
      typeof billing_management !== "boolean" ||
      typeof team_management !== "boolean"
    ) {
      return {
        req_status: false,
        error_toast: "Permissions must be boolean values.",
      };
    }

    return this.request("/team-invite", {
      email,
      crm_management,
      billing_management,
      team_management,
    });
  }

  static async teamChange(
    user_oid: string,
    email: string,
    crm_management: boolean,
    billing_management: boolean,
    team_management: boolean
  ) {
    if (!user_oid && !email) {
      return {
        req_status: false,
        error_toast: "Either 'user_oid' or 'email' is required.",
      };
    }

    return this.request("/team-change", {
      user_oid,
      email,
      crm_management,
      billing_management,
      team_management,
    });
  }

  static async teamCancel(email: string) {
    if (!email || typeof email !== "string") {
      return { req_status: false, error_toast: "'email' is required." };
    }
    return this.request("/team-cancel", { email });
  }
}
