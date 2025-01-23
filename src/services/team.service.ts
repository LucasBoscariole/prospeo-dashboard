import { API_URL } from "@/constants/url";
import { cookies } from "next/headers";


export class TeamService {
  static async request(endpoint: string, data: object) {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.has("x-prospeo-session")
      ? cookieStore.get("x-prospeo-session")?.value ?? ""
      : "";

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

  static async getTeam(page: number) {
    return this.request("/team", { page });
  }
}
