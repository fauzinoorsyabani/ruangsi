import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, RUANGSI_INSTAGRAM_URL, RUANGSI_WHATSAPP_NUMBER } from "../shared/contact";

describe("RuangSI contact links", () => {
  it("builds an international WhatsApp consultation URL with the CTA context", () => {
    const url = buildWhatsAppUrl("kelas proposal");

    expect(url).toContain(`https://wa.me/${RUANGSI_WHATSAPP_NUMBER}`);
    expect(decodeURIComponent(url)).toContain("kelas proposal");
  });

  it("uses the verified Instagram profile URL", () => {
    expect(RUANGSI_INSTAGRAM_URL).toBe("https://www.instagram.com/jago.jokitugas/");
  });
});
