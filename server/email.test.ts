import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the email module
vi.mock("./email", () => ({
  sendSDRLeadEmail: vi.fn().mockResolvedValue(true),
  sendContactFormEmail: vi.fn().mockResolvedValue(true),
  verifyEmailConnection: vi.fn().mockResolvedValue(false),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("email.sendSDRLead", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("accepts valid SDR lead data and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.email.sendSDRLead({
      visitorName: "John Doe",
      visitorEmail: "john@example.com",
      visitorCompany: "Acme Corp",
      projectType: "AI Automation",
      projectDescription: "We need to automate our sales process",
      budget: "$50,000 - $100,000",
      timeline: "3 months",
      conversationHistory: [
        { role: "assistant", content: "Welcome to BlackPyramid." },
        { role: "user", content: "Hi, I'm John from Acme Corp." },
      ],
      language: "en",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("successfully");
  });

  it("validates required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.email.sendSDRLead({
        visitorName: "",
        visitorEmail: "invalid-email",
        projectType: "",
        projectDescription: "",
        conversationHistory: [],
        language: "en",
      })
    ).rejects.toThrow();
  });

  it("validates email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.email.sendSDRLead({
        visitorName: "John Doe",
        visitorEmail: "not-an-email",
        projectType: "AI Automation",
        projectDescription: "Test description",
        conversationHistory: [],
        language: "en",
      })
    ).rejects.toThrow();
  });
});

describe("email.sendContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("accepts valid contact form data and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.email.sendContactForm({
      name: "Jane Smith",
      email: "jane@company.com",
      company: "Tech Corp",
      subject: "AI Automation Inquiry",
      message: "I'm interested in learning more about your AI automation services.",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("successfully");
  });

  it("validates required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.email.sendContactForm({
        name: "",
        email: "jane@company.com",
        subject: "",
        message: "Short",
      })
    ).rejects.toThrow();
  });

  it("validates minimum message length", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.email.sendContactForm({
        name: "Jane Smith",
        email: "jane@company.com",
        subject: "Test",
        message: "Too short",
      })
    ).rejects.toThrow();
  });
});

describe("email.checkStatus", () => {
  it("returns configuration status", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.email.checkStatus();

    expect(result).toHaveProperty("configured");
    expect(result).toHaveProperty("message");
    expect(typeof result.configured).toBe("boolean");
  });
});
