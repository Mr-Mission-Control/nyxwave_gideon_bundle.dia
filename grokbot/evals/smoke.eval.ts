import { defineEval } from "@grok/agent-sdk/evals";

export default defineEval({
  tags: ["smoke"],
  description: "Grok Bot reports its connector card status or echoes a test message.",
  async test(t) {
    await t.send('Use the connector-card tool to check MCP connectors.');
    t.succeeded();
    t.calledTool("connector-card");
  },
});
