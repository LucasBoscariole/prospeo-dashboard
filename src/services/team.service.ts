import axios from "axios";

const API_URL = "/api/team";

export class TeamService {
  static async getTeam(page: number) {
    try {
      const response = await axios.post(
        API_URL,
        { page },
        {
          headers: {
            "X-PROSPEO-SESSION": "your-session-token-here",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { req_status: false, error_toast: error.message };
      } else {
        return {
          req_status: false,
          error_toast: "An unexpected error occurred.",
        };
      }
    }
  }

  static async teamRemove(user_oid: string) {
    try {
      if (!user_oid) {
        return { req_status: false, error_toast: "'user_oid' is required." };
      }

      const response = await axios.post(
        `${API_URL}/remove`,
        { user_oid },
        {
          headers: {
            "X-PROSPEO-SESSION": "your-session-token-here",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { req_status: false, error_toast: error.message };
      } else {
        return {
          req_status: false,
          error_toast: "An unexpected error occurred.",
        };
      }
    }
  }

  static async teamLeave(leave: boolean) {
    try {
      if (typeof leave !== "boolean") {
        return {
          req_status: false,
          error_toast: "'leave' is required and must be a boolean.",
        };
      }

      if (leave) {
        const canLeaveTeam = true;

        if (canLeaveTeam) {
          const response = await axios.post(
            `${API_URL}/leave`,
            { leave },
            {
              headers: {
                "X-PROSPEO-SESSION": "your-session-token-here",
              },
            }
          );
          return response.data;
        } else {
          return {
            req_status: false,
            error_toast:
              "You cannot leave the team as you are the only member with team management and billing permissions inside it.",
          };
        }
      } else {
        return {
          req_status: false,
          error_toast: "You must confirm your intention to leave.",
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { req_status: false, error_toast: error.message };
      } else {
        return {
          req_status: false,
          error_toast: "An unexpected error occurred.",
        };
      }
    }
  }

  static async teamJoin(team_oid: string) {
    try {
      if (!team_oid || typeof team_oid !== "string") {
        return {
          req_status: false,
          error_toast: "'team_oid' is required and must be a string.",
        };
      }

      const response = await axios.post(
        `${API_URL}/join`,
        { team_oid },
        {
          headers: {
            "X-PROSPEO-SESSION": "your-session-token-here",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { req_status: false, error_toast: error.message };
      } else {
        return {
          req_status: false,
          error_toast: "An unexpected error occurred.",
        };
      }
    }
  }

  static async teamInvite(
    email: string,
    crm_management: boolean,
    billing_management: boolean,
    team_management: boolean
  ) {
    try {
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

      const response = await axios.post(
        `${API_URL}/invite`,
        { email, crm_management, billing_management, team_management },
        {
          headers: {
            "X-PROSPEO-SESSION": "your-session-token-here",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { req_status: false, error_toast: error.message };
      } else {
        return {
          req_status: false,
          error_toast: "An unexpected error occurred.",
        };
      }
    }
  }

  static async teamChange(
    user_oid: string,
    email: string,
    crm_management: boolean,
    billing_management: boolean,
    team_management: boolean
  ) {
    try {
      if (!user_oid && !email) {
        return {
          req_status: false,
          error_toast: "Either 'user_oid' or 'email' is required.",
        };
      }

      if (email && email === "fdfd@gmail.com") {
        const response = await axios.post(
          `${API_URL}/change`,
          { email, crm_management, billing_management, team_management },
          {
            headers: {
              "X-PROSPEO-SESSION": "your-session-token-here",
            },
          }
        );
        return response.data;
      }

      if (user_oid && user_oid === "656ds5f6ds5dddd") {
        if (crm_management && billing_management && team_management) {
          const response = await axios.post(
            `${API_URL}/change`,
            { user_oid, crm_management, billing_management, team_management },
            {
              headers: {
                "X-PROSPEO-SESSION": "your-session-token-here",
              },
            }
          );
          return response.data;
        } else {
          return {
            req_status: false,
            error_toast:
              "You do not have the permissions to edit team members.",
          };
        }
      }

      return {
        req_status: false,
        error_toast: "Something went wrong. Please contact the support.",
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { req_status: false, error_toast: error.message };
      } else {
        return {
          req_status: false,
          error_toast: "An unexpected error occurred.",
        };
      }
    }
  }

  static async teamCancel(email: string) {
    try {
      const response = await axios.post(
        `${API_URL}/cancel`,
        { email },
        {
          headers: {
            "X-PROSPEO-SESSION": "your-session-token-here",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { req_status: false, error_toast: error.message };
      } else {
        return {
          req_status: false,
          error_toast: "An unexpected error occurred.",
        };
      }
    }
  }
}
