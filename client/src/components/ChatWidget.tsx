import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
}

interface LeadData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  projectDescription: string;
  budget: string;
  timeline: string;
}

export default function ChatWidget() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages with translated content
  useEffect(() => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: t("chat.welcome"),
        timestamp: new Date(),
      },
    ]);
  }, [t, i18n.language]);

  const conversationFlow = [
    {
      trigger: 1,
      response:
        "Thank you! It's a pleasure to connect. What challenge or opportunity brings you to us today? Are you looking to increase sales, automate processes, launch a new product, or something else?",
      dataField: "name",
    },
    {
      trigger: 2,
      response:
        "That's a significant goal. Many of our most successful clients, from fast-growing startups to Fortune 500 companies, came to us with a similar challenge. Could you elaborate a bit more on what you've tried so far and what an ideal outcome would look like for you?",
      dataField: "projectType",
    },
    {
      trigger: 3,
      response:
        "Excellent. Understanding that vision is key. Based on what you've described, it seems like a strategic approach involving our AI automation and marketing solutions could be the most effective path. This is precisely the kind of challenge we specialize in solving. We've seen this approach deliver a 3x increase in qualified leads for clients in your sector.",
      dataField: "projectDescription",
    },
    {
      trigger: 4,
      response:
        "To ensure our human specialists can design a precise, high-ROI proposal for you, I just need a few more details. Do you have a specific timeline in mind for this project? And what's the primary metric you'll use to measure its success (e.g., revenue, cost savings, market share)?",
      dataField: "budget",
    },
    {
      trigger: 5,
      response:
        "Perfect. We believe in delivering premium, high-performance solutions that generate a significant return on investment. Our pricing is structured to be competitive with the top-tier agencies in the world, while ensuring you receive demonstrable and superior value. What is the best email to send this summary to, along with the next steps for a detailed proposal from our team?",
      dataField: "timeline",
    },
    {
      trigger: 6,
      response:
        "Excellent! I'm sending a summary of our conversation to your email now. You'll receive it shortly along with the next steps for a detailed proposal from our team. We're excited about the possibility of helping you achieve your goals. The BlackPyramid team will be in touch within 24 hours. Is there anything else you'd like to discuss?",
      dataField: "email",
      submitLead: true,
    },
  ];

  const sendLeadMutation = trpc.email.sendSDRLead.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setLeadSubmitted(true);
        toast.success("Your information has been sent to our team!");
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      console.error("Failed to send lead:", error);
      toast.error("Failed to submit. Please try again or email us directly.");
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const extractEmail = (text: string): string | null => {
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
    const match = text.match(emailRegex);
    return match ? match[0] : null;
  };

  const extractNameAndCompany = (text: string): { name: string; company: string } => {
    const parts = text.split(/[,.\n]/);
    const name = parts[0]?.trim() || text.trim();
    const companyMatch = text.match(/(?:from|at|with|company|website|site)[:\s]+([^\s,]+)/i);
    const company = companyMatch ? companyMatch[1] : "";
    return { name, company };
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    const newCount = messageCount + 1;
    setMessageCount(newCount);

    const currentFlow = conversationFlow.find((item) => item.trigger === newCount);
    
    if (currentFlow?.dataField) {
      const updatedLeadData = { ...leadData };
      
      switch (currentFlow.dataField) {
        case "name":
          const { name, company } = extractNameAndCompany(currentInput);
          updatedLeadData.name = name;
          updatedLeadData.company = company;
          break;
        case "email":
          const email = extractEmail(currentInput);
          if (email) {
            updatedLeadData.email = email;
          } else {
            updatedLeadData.email = currentInput.trim();
          }
          break;
        default:
          updatedLeadData[currentFlow.dataField as keyof LeadData] = currentInput;
      }
      
      setLeadData(updatedLeadData);

      if (currentFlow.submitLead && updatedLeadData.email) {
        const conversationHistory = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        sendLeadMutation.mutate({
          visitorName: updatedLeadData.name || "Unknown",
          visitorEmail: updatedLeadData.email,
          visitorCompany: updatedLeadData.company,
          projectType: updatedLeadData.projectType || "General Inquiry",
          projectDescription: updatedLeadData.projectDescription || "Not specified",
          budget: updatedLeadData.budget,
          timeline: updatedLeadData.timeline,
          conversationHistory,
          language: i18n.language || "en",
        });
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const flowItem = conversationFlow.find((item) => item.trigger === newCount);
    const responseContent =
      flowItem?.response ||
      "Thank you for that information. Is there anything specific about our services you'd like to know more about?";

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full gold-gradient text-primary-foreground shadow-lg hover:shadow-xl transition-shadow animate-pulse-gold"
            aria-label="Open chat"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)] bg-card border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50 bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="/images/pyramid-icon.png"
                    alt="BlackPyramid AI"
                    className="h-10 w-10"
                  />
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-card" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-foreground">
                    {t("chat.title")}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t("chat.subtitle")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {leadSubmitted && (
                  <span className="flex items-center gap-1 text-xs text-green-500">
                    <CheckCircle className="h-4 w-4" />
                    {t("chat.sent")}
                  </span>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm font-sans ${
                      message.role === "user"
                        ? "bg-gold text-primary-foreground rounded-br-md"
                        : "bg-secondary text-secondary-foreground rounded-bl-md"
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary text-secondary-foreground p-3 rounded-2xl rounded-bl-md">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <span
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <span
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50 bg-secondary/30">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t("chat.placeholder")}
                  className="flex-1 bg-input border border-border rounded-xl px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
                <Button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping || sendLeadMutation.isPending}
                  className="gold-gradient text-primary-foreground p-3 rounded-xl hover:opacity-90 disabled:opacity-50"
                >
                  {isTyping || sendLeadMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {t("chat.powered")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
