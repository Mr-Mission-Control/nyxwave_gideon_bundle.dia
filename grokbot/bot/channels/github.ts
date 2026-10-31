import { defaultGitHubAuth, githubChannel } from "@grok/agent-sdk/channels/github";

export default githubChannel({
  botName: "grokbot",
  cursorAccount: {
    repos: [
      "Mr-Mission-Control/nyxwave_gideon_bundle.dia",
      "Mr-Mission-Control/awesome-browser-extensions-for-github",
    ],
    permissions: "pr-write",
  },
  onPullRequest: (ctx, pr) => {
    if (pr.action !== "opened" && pr.action !== "synchronize") {
      return null;
    }
    return { auth: defaultGitHubAuth(ctx) };
  },
});
