export type EnquiryPayload = {
  name: string;
  email: string;
  type: string;
  message: string;
  subject?: string;
};

export async function submitEnquiry(data: EnquiryPayload) {
  const res = await fetch("/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name.trim(),
      email: data.email.trim(),
      type: data.type,
      subject: data.subject?.trim() || null,
      message: data.message.trim(),
      status: "new",
    }),
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || "Could not send your message. Please try again.");
  }

  return json.data;
}
