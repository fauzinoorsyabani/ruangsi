import { z } from "zod";
import { createBookingInquiry } from "../db";
import { publicProcedure, router } from "../_core/trpc";

export const bookingInput = z.object({
  fullName: z.string().trim().min(2, "Nama minimal dua karakter").max(120),
  whatsapp: z.string().trim().min(8, "Nomor WhatsApp belum valid").max(32),
  email: z.string().trim().email("Email belum valid").max(320).optional().or(z.literal("")),
  campus: z.string().trim().max(180).optional().or(z.literal("")),
  studyProgram: z.string().trim().min(2, "Program studi wajib diisi").max(160),
  thesisStage: z.string().trim().min(2, "Pilih tahap skripsimu").max(120),
  topicNote: z.string().trim().max(2000).optional().or(z.literal("")),
  productHandle: z.string().trim().max(255).optional(),
  productTitle: z.string().trim().max(255).optional(),
});

export const bookingRouter = router({
  create: publicProcedure.input(bookingInput).mutation(async ({ input }) => {
    await createBookingInquiry({
      fullName: input.fullName,
      whatsapp: input.whatsapp,
      email: input.email || null,
      campus: input.campus || null,
      studyProgram: input.studyProgram,
      thesisStage: input.thesisStage,
      topicNote: input.topicNote || null,
      productHandle: input.productHandle ?? null,
      productTitle: input.productTitle ?? null,
    });

    return { success: true } as const;
  }),
});
