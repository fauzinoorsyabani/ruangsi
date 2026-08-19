import { describe, expect, it } from "vitest";
import { bookingInput } from "./routers/booking";

describe("bookingInput", () => {
  it("accepts an enquiry with optional contact and product metadata", () => {
    const parsed = bookingInput.parse({
      fullName: "Nadia Putri",
      whatsapp: "628123456789",
      email: "nadia@example.com",
      campus: "Universitas Contoh",
      studyProgram: "Sistem Informasi",
      thesisStage: "Menyusun proposal",
      topicNote: "Sistem informasi inventori kampus",
      productHandle: "kelas-proposal-it",
      productTitle: "Kelas Proposal & Metodologi IT",
      intent: "kelas-proposal",
    });

    expect(parsed.productHandle).toBe("kelas-proposal-it");
    expect(parsed.intent).toBe("kelas-proposal");
  });

  it("rejects an incomplete booking enquiry", () => {
    expect(() => bookingInput.parse({
      fullName: "N",
      whatsapp: "12",
      studyProgram: "",
      thesisStage: "",
    })).toThrow();
  });
});
