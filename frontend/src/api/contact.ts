import { API_URL } from "./client";

export async function submitContact(data: any) {
  const payload = {
    name: data.name || data.full_name,
    email: data.email,
    phone: data.phone || "",
    service: data.service || "General Inquiry",
    budget: data.company || "",
    message: data.message,
  };

  const response = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || "Failed to submit contact.");
  }

  return response.json();
}