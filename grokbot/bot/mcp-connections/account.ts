import { defineConnection } from "@grok/agent-sdk";

export default defineConnection({
  cursorAccount: true,
  servers: ["Google-drive", "Gmail", "Onedrive"],
  advertiseTools: true,
});
