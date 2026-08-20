import { API_URL } from "./client";

export async function submitContact(data: any) {
  const response = await fetch(`${API_URL}/contact/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit contact.");
  }

  return response.json();
}