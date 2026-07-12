import { API_URL } from "./client";

export async function subscribeNewsletter(data: any) {
  const response = await fetch(`${API_URL}/newsletter/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to subscribe.");
  }

  return response.json();
}

