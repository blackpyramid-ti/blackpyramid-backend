import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { sendSDRLeadEmail, sendContactFormEmail, verifyEmailConnection } from "./email";

// SDR Lead schema
const sdrLeadSchema = z.object({
  visitorName: z.string().min(1),
  visitorEmail: z.string().email(),
  visitorCompany: z.string().optional(),
  projectType: z.string().min(1),
  projectDescription: z.string().min(1),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  conversationHistory: z.array(
    z.object({
      role: z.enum(["assistant", "user"]),
      content: z.string(),
    })
  ),
  language: z.string().default("en"),
});

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Email endpoints
  email: router({
    // Send SDR lead email
    sendSDRLead: publicProcedure
      .input(sdrLeadSchema)
      .mutation(async ({ input }) => {
        const success = await sendSDRLeadEmail({
          ...input,
          timestamp: new Date(),
        });

        return {
          success,
          message: success
            ? "Lead submitted successfully. Our team will contact you shortly."
            : "Failed to submit lead. Please try again or contact us directly.",
        };
      }),

    // Send contact form email
    sendContactForm: publicProcedure
      .input(contactFormSchema)
      .mutation(async ({ input }) => {
        const success = await sendContactFormEmail({
          ...input,
          timestamp: new Date(),
        });

        return {
          success,
          message: success
            ? "Message sent successfully. We'll get back to you soon."
            : "Failed to send message. Please try again or email us directly at contact@blackpyramid.co",
        };
      }),

    // Check email configuration status
    checkStatus: publicProcedure.query(async () => {
      const isConfigured = await verifyEmailConnection();
      return {
        configured: isConfigured,
        message: isConfigured
          ? "Email service is configured and ready"
          : "Email service is not configured. Please set SMTP environment variables.",
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;
