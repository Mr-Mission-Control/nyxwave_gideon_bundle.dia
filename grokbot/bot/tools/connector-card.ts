import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";

const CONNECTORS = [
  {
    id: "google-drive",
    name: "Google Drive",
    namespace: "Google-drive",
    category: "MCP",
    status: "connected",
    principal: "mrmissionctrl@gmail.com (Nyxwave Team Logs)",
    configPath: "bot/mcp-connections/account.ts",
    advertiseTools: true,
    scopes: ["drive.readonly", "drive.file", "documents", "comments"],
  },
  {
    id: "gmail",
    name: "Gmail",
    namespace: "Gmail",
    category: "MCP",
    status: "connected",
    principal: "mrmissionctrl@gmail.com",
    configPath: "bot/mcp-connections/account.ts",
    advertiseTools: true,
    scopes: ["gmail.readonly", "gmail.compose", "gmail.modify", "gmail.labels"],
  },
  {
    id: "onedrive",
    name: "Microsoft OneDrive",
    namespace: "Onedrive",
    category: "MCP",
    status: "connected",
    principal: "a7wingedseraphim@outlook.com",
    configPath: "bot/mcp-connections/account.ts",
    advertiseTools: true,
    scopes: ["Files.ReadWrite.All", "Sites.Read.All", "User.Read"],
  },
  {
    id: "github",
    name: "GitHub",
    namespace: "github",
    category: "Channel",
    status: "connected",
    principal: "Mr-Mission-Control/*",
    configPath: "bot/channels/github.ts",
    advertiseTools: true,
    scopes: ["pull_requests:write", "checks:read", "contents:write", "issues:write"],
  },
] as const;

export default defineTool({
  description:
    "Return Grok Bot's connector card summary and status for Google-drive, Gmail, Onedrive, and GitHub.",
  execution: "server",
  effect: "read",
  inputSchema: z.object({
    category: z.enum(["All", "MCP", "Channel"]).optional(),
  }),
  async execute({ category = "All" }) {
    const filtered = CONNECTORS.filter((c) =>
      category === "All" ? true : c.category === category,
    );
    return {
      botName: "Grok Bot",
      operator: "MR Mission Control",
      categoryFilter: category,
      count: filtered.length,
      connectors: filtered.map((c) => ({
        id: c.id,
        name: c.name,
        namespace: c.namespace,
        category: c.category,
        status: c.status,
        principal: c.principal,
        configPath: c.configPath,
        advertiseTools: c.advertiseTools,
        scopes: [...c.scopes],
      })),
    };
  },
});
