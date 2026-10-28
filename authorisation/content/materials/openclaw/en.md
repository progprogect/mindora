# The OpenClaw Guide

A standalone AI assistant that runs on your own hardware and lives in the chat apps you already use — set it up in about 30 minutes.

**30-min** setup · **runs on** your hardware · **works in** your chat apps · **free updates** forever

[🚀 Start here](#what-is-openclaw)[⏱️ 30-min setup](#how-to-set-everything-up-in-30-minutes)

## 🦀 **What is OpenClaw?**

**OpenClaw is a standalone AI assistant that runs on your computer and connects to the chat apps you already use.** WhatsApp, Telegram, Discord, Slack, iMessage, Signal — take your pick. Send messages, clean out your inbox, manage your calendar, run shell commands, and control your smart home. **This is not a chatbot stuck inside a browser tab.** OpenClaw has persistent memory, full system access, and can reach out to you proactively. Built by Peter Steinberger (the founder of PSPDFKit), it racked up more than 60,000 stars on GitHub and became one of the fastest-growing open-source projects in GitHub history.

* * *

## The crab that shook the world of artificial intelligence

Peter Steinberger started building what would later become OpenClaw in April 2024. He wanted a "life assistant" that would actually work, but the AI models of the time couldn't deliver it. He shelved the idea. By November he realized that no major company was going to build what he needed, so he built it himself. The first prototype took one hour. He asked Claude to suggest a name, and it proposed "Clawdbot" (claw + bot, a nod to Claude). The lobster mascot stuck. In January 2026 Anthropic sent a cease-and-desist over the "Clawd" trademark, which forced the project to be renamed OpenClaw. OpenClaw earned 9,000 GitHub stars in 24 hours and surpassed 60,000 within a few weeks, becoming one of the fastest-growing open-source projects in GitHub history. Andrej Karpathy praised it. MacStories called it "the future of personal AI assistants." The virality came down to one thing: it actually does something. Not "chats about doing something." It runs locally, so your data stays yours. And unlike all the corporate AI assistants that have promised this since Siri launched in 2011, OpenClaw delivered on its promise. People shared screenshots, showed off their setups, and the FOMO spread. Some users even bought a Mac Mini specifically to run it 24/7.

* * *

## **OpenClaw Architecture**

 OpenClaw is made up of four core components that work together: the gateway, the agent, the skills, and the memory. Picture a restaurant. The gateway is the front door and phone line, taking orders from anywhere (WhatsApp, Telegram, Discord). The Agent is the chef, the actual AI brain making decisions about what to do. Skills are the kitchen tools and ingredients, the specific capabilities that let it carry out tasks like sending emails or driving a browser. And Memory is the recipe book and customer preferences — everything it remembers about you and your past conversations.

### **Gateway**

The gateway is a background service that runs around the clock on your computer, VPS, or server. It's the single point that handles all your messages and coordinates every process. When you send a "check my calendar" message via WhatsApp at 6 a.m., the gateway receives it, routes it to the agent for processing, and sends the reply back through WhatsApp. It listens on a local address (ws://127.0.0.1:18789 by default) and handles session management, security, and everything that keeps the system running. Unlike CLI tools that stop working when you close the terminal, the gateway keeps running. Close your laptop, go on vacation, and send messages from your phone anywhere in the world. It's still running.

### **Agent**

The agent is where the thinking happens. It's not OpenClaw's own AI model. It connects to external LLMs that you choose: Claude from Anthropic, GPT from OpenAI, Gemini from Google, or even local models via Ollama. You bring your own API key (or subscription), and the agent uses that model to interpret your requests, decide what actions to take, and craft replies. When you say "unsubscribe me from all marketing emails," the agent understands what that means: go into Gmail, find the marketing emails, locate the unsubscribe links, and click them. It breaks your intent down into actionable steps.

### **Skills**

Skills are the modular tools that give the agent its power. Without skills, the agent is just a chatbot. With skills, it can actually get things done. More than 50 ready-made skills come bundled in: browser automation (via Puppeteer), file system access, Gmail integration, calendar management, GitHub actions, Notion, Slack, smart-home control, and much more. Skills follow a plugin architecture, so the community builds and shares new skills through ClawdHub (OpenClaw's skill registry). You can even ask OpenClaw to build your own skills. Users have done exactly that, asking it to create custom integrations for Todoist, WHOOP, or niche APIs that didn't exist yet.

### **Why it remembers everything**

 Unlike ChatGPT or Claude in the browser (which forget you the moment you close the tab), OpenClaw stores everything locally in Markdown files. Your preferences, past conversations, and important details you mentioned weeks ago. This persistent memory lives in your ~/.OpenClaw/ directory. The agent draws on this context with every interaction, so it feels like talking to someone who genuinely knows you. Tell it once about your wife's birthday, and it will remind you to buy a gift next year. Mention that you hate morning meetings, and it will factor that in when suggesting schedules. Memory also lets it act proactively: OpenClaw can start conversations, send morning briefings, or alert you when something important happens, because it has the context to know what matters to you.

### **How they work together**

Here's how it works: you send a message via Telegram. The gateway receives it and routes it to the agent. The agent (running on Claude, GPT, or whatever model you chose) interprets your request and decides which skills to engage. Those skills perform the actual actions — whether that's reading your emails, browsing a website, or running a command line. The results come back through the gateway into your Telegram chat. Memory is updated with anything that might be relevant for future context. The whole loop takes mere seconds, and you never have to leave your chat app.

### **The proactive difference**

Most AI tools are reactive. You ask a question, they answer. OpenClaw has a Heartbeat Engine and a cron-job system that let it be proactive. You can set it up to check your calendar every morning and send you a brief. It can monitor your inbox and alert you when an email arrives from a specific sender. It can track flight delays and notify you before you head to the airport. It doesn't wait for you to ask. It reaches out to you when something matters.

* * *

### The most practical use cases

### What the developer recommends

Peter Steinberger first built OpenClaw as a personal tool. The official documentation positions it as a remote operations layer for machines that need constant, lightweight automation. The recommended deployment pattern is simple: secondary machines, dedicated accounts, and non-critical workflows. Run it on hardware you don't use for important day-to-day work. Create separate email and service accounts specifically for automation. Start with tasks where a failure would be annoying but not catastrophic.

> The documentation highlights three primary usage scenarios: **Remote system management.** Manage files, run scripts, and query system state without logging in. Organize directories, run batch jobs, and check disk usage — all from your phone when you're out of the office. **Scheduled and conditional automation.** Thanks to cron integration and heartbeat monitoring, OpenClaw can independently watch for conditions and react without your prompting. Watch a folder for new files. Check your inbox every morning. Get notified when something changes. **Multi-agent orchestration.** Routing different tasks to specialized agents. One watches email, another handles the calendar, and a third coordinates their work. Each has its own context and model configuration. 💡 The documentation is explicit about what OpenClaw is not. It's not a consumer assistant for one-off personal tasks. It's infrastructure for people who want to automate their digital lives without handing their data over to a cloud provider.

### How people actually use this system

The community has gone far beyond the recommended use cases. Here's what power users are building, with links to their posts showing real setups.

### The Mac Mini moment

Aaron Ng created what became the template: a dedicated Mac Mini with its own Apple, Gmail, and GitHub accounts, so OpenClaw would have a completely separate identity.

* * *

### The car-buying negotiation that saved $4,200

AJ Stuyvenberg used OpenClaw to negotiate with multiple car dealers simultaneously via browser, email, and iMessage, playing them off against each other until he saved $4,200. You can read the full write-up here:

* * *

### Developer workflows

Nat Eliason runs his entire app-improvement workflow through OpenClaw: screenshotting bugs, getting a list of hypotheses, launching Codex agents to open PRs, and then Claude reviews them on GitHub. @swiftlysingh built an Excalidraw integration so agents can generate diagrams on command. Chris Baines posted a video of agents launching from his phone via Telegram to ship features while he's away from his desk.

* * *

### Personal-life automation

@danpeguine filmed a video showing how to install a skill via WhatsApp and then use it immediately. The whole loop takes a few seconds. @dreetje uses OpenClaw as a full-blown life manager: spam filtering, reading messages, ordering groceries, calculating trip expenses, and mimicking his personality in group chats. @stevecaldwell built a complete 2026 meal-planning system with shopping lists sorted by store aisle and weather-aware grilling recommendations.

* * *

## Hardware setup

Andrew Jiang bought a $35 holocube to give OpenClaw a physical embodiment. "It's basically a Tamagotchi now." @iannuttall bought his OpenClaw its "first home" with a dedicated Mac Mini setup.

* * *

### Multi-agent orchestration

@jdrhyne runs more than 15 agents across 3 machines in a single Discord server: clearing out 10,000 emails, reviewing Google Slides, publishing npm packages, and drafting social-media posts in his voice.

> 💡 The common thread across all these use cases: people aren't just automating tasks. They're building personal infrastructure that expands over time. Every skill added, every workflow refined, every integration connected makes the next piece easier to build.

* * *

## **⏱️ How to set everything up in 30 minutes**

Before you touch the terminal, make three decisions. **Hardware, channel, and budget. If** you get these wrong, you'll be reconfiguring everything a week later.

## Choose your hardware

 OpenClaw needs a device that runs constantly. Your regular everyday laptop won't cut it. Here's how to choose:

> **Mac Mini (M2/M4) —** $5**99+** The power users' choice. Native iMessage integration only works on macOS, so if you want OpenClaw to read and send iMessages, this is your only option. It runs silently, sips power, and handles browser automation without trouble. The community calls it "buying OpenClaw its first home." Overkill for basic chat automation, perfect if you're going all in.
>
> **VPS (Hetzner, DigitalOcean) — $4–6 per** month The practical choice. Always online, no hardware maintenance, accessible from anywhere. Hetzner's cheapest ARM instances start at €3.79 per month and handle everything except browser automation. If you need Puppeteer, bump the RAM up to 4 GB. No iMessage support, but Telegram and WhatsApp work fine. Perfect for anyone who wants reliability without buying hardware.
>
> **Raspberry Pi 4/5 — $35–100** one-time The choice for tinkerers. Low power draw means you can leave it running forever without worrying about your electric bill. Good for chat and basic automation. Won't handle anything that needs serious compute. A good first experiment before moving on to something bigger.
>
> **Old laptop/PC —** free The test run. Dust off that 2018 MacBook or a decommissioned ThinkPad. Install Node.js 22, run the installer, and see whether OpenClaw fits your workflow before spending money. But the catch? You have to keep it on and plugged into power. Fine for experiments, but inconvenient for daily use.

## Choose your channel

 OpenClaw connects to more than 10 messaging platforms. You don't need all of them. Pick one to start.

> **Telegram** is the path of least resistance. Create a bot with @BotFather in under three minutes, paste in the token — and you're done. The bot lives in its own chat, completely separate from your personal conversations. The simplest setup, the cleanest separation.
>
> **WhatsApp** means you don't have to leave your main chat app. Message OpenClaw just like you message everyone else. The downside: setup requires scanning a QR code to link the session, and WhatsApp doesn't distinguish between personal accounts and bots. Use a dedicated phone number if you're worried about your main account.
>
> **Discord** is great for multi-agent setups. Run 15 agents on one server, each in its own channel. It requires creating a bot application and enabling message content intents, which takes 10 minutes instead of 3. Worth it if you plan to scale.
>
> **iMessage** works only on macOS and requires extra setup. If you're already using a Mac Mini, it's the most convenient option, since it's the same app you already use.
>
> **Slack** is the obvious choice for work automation. Connect OpenClaw to your workspace and manage tasks without leaving the app where you already spend 8 hours a day. It requires creating a Slack app and configuring OAuth permissions, which takes longer than Telegram but isn't hard. Best for anyone who wants OpenClaw to handle work tasks like summarizing threads, drafting replies, or monitoring channels.
>
> **Signal** puts privacy first. If you chose OpenClaw precisely because you don't trust cloud providers with your data, Signal fits that philosophy. Setup is similar to WhatsApp using a QR code. The trade-off is that a smaller user base means fewer people to message — but that may be exactly the point. 💡 Where do you already live? If you spend all day in WhatsApp, use WhatsApp. If you want a clean separation between personal and bot conversations, use Telegram.

* * *

## Know how much you'll spend

 OpenClaw is free. But running it isn't. **Infrastructure costs** are predictable. A basic VPS costs $4–6 per month. A Mac Mini costs $599 and up. A Raspberry Pi costs $35–100. Pick your option. **API costs** surprise a lot of people. OpenClaw uses whatever LLM you connect to it. Claude Sonnet costs $3 per million input tokens and $15 per million output tokens. With moderate daily use, expect costs of $20–50 per month. With heavy automation and multi-agent setups — $100–300 per month. The ceiling is high. Federico Viticci of MacStories spent 180 million tokens in his first month, which works out to roughly $3,600 in API costs. He found it more useful than the standard ChatGPT or Claude interfaces, so he kept going. That's an extreme case, but it shows what happens when you let an AI agent run free on complex tasks. **There are cost controls.** Set spending limits in the Anthropic or OpenAI dashboard. Use cheaper models (Claude Haiku, GPT-4o-mini) for routine tasks and reserve the expensive models for complex reasoning. Run local models via Ollama if you have powerful hardware and want to drive your API costs to zero.

> 💡 Ask yourself: what's your monthly AI budget? If it's under $30, start conservatively with a cheap VPS and Claude Haiku. If you're already spending more than $100 on ChatGPT Plus and other AI tools, OpenClaw will probably replace some of those costs while getting more done.

* * *

## Pre-dive checklist

Before running the installer, get the following ready:

> -   \[ \] **Node.js 22 or higher.** Check with `node --version`. If you're on a version below 22, upgrade first. Otherwise the installer will throw an error.
> -   \[ \] **Your API key.** Anthropic, OpenAI, or Google. Create it before you start. You'll paste it in during onboarding. No preference? Start with Claude Sonnet.
> -   \[ \] **Your channel choice.** Decide whether you'll connect to Telegram, WhatsApp, or Discord. The setup wizard will ask about it.
> -   \[ \] **At least 2 GB of RAM.** 4 GB+ if you want to automate the browser with Puppeteer. Most VPS providers let you check this before provisioning.
> -   \[ \] **30 minutes of uninterrupted time.** The installation itself takes 5 minutes. Setup and the first conversation will take another 25 minutes. Don't start this during a meeting.

* * *

## Ready to install?

## **Overview of the setup process**

Setting up Clawdbot takes 30–60 minutes and requires basic terminal command skills. Since the project launched in late 2025, this process has gotten significantly simpler. - Step **one:.** Prepare the infrastructure. For a VPS deployment, create an account with Hetzner, DigitalOcean, or AWS. Spin up an Ubuntu 22.04 instance with at least 2 GB of RAM. For a local deployment, make sure you have a machine running macOS, Linux, or Windows with WSL2 - **Step two:.** Install Node.js version 22 or higher. The official NodeSource repository provides the right version for Ubuntu. macOS users can install it via Homebrew - **Step three:**`curl -fsSL https://clawd.bot/install.sh | bash npm install -g clawdbot@latest` Install Clawdbot. Run the one-line installer: . Alternatively, install via npm: **.** - **Step four:**`clawdbot onboard --install-daemon`**.** Run the setup wizard with the command `.`. The wizard walks you through authentication (API keys for Claude or GPT), channel setup (Telegram, WhatsApp, Discord), and installing the daemon so the gateway runs continuously - **Step five:.** Create the links between your messaging channels. For Telegram, message @BotFather to create a bot token (this takes 2–3 minutes). For WhatsApp, scan a QR code to link the session. For Discord, you need to create a bot application and enable message content intents - **Step six:**`clawdbot pairing approve . This security measure prevents unauthorized access.``**‍**` Approve pairing requests. When you first message your bot, it generates a pairing code. Approve the request with - **Step seven:** Configure skills and memory. Add web-search capabilities (the Brave Search API offers 2,000 free queries per month), connect productivity tools like Gmail and Google Calendar, and set up the SOUL.md file that governs your assistant's personality. The official documentation at docs.clawd.bot provides detailed platform-specific guides. The Discord community (more than 5,000 members as of January 2026) offers nearly instant troubleshooting help.

> 💡 An interactive assistant that helps not only with setup but also answers many questions for a complete understanding [https://notebooklm.google.com/notebook/bc568da7-ac3f-4f55-bded-3f72506424b3](https://notebooklm.google.com/notebook/bc568da7-ac3f-4f55-bded-3f72506424b3).

## **Security considerations**

Running an AI assistant with full access to your computer requires a carefully thought-out security setup. Enable sandbox mode to isolate risky operations in containers rather than running them directly on your system. Instead of granting unrestricted terminal access, you should whitelist specific commands — if the agent is compromised, the damage will be limited to permitted operations. You must strictly limit the scope of API tokens when connecting to services like GitHub, Gmail, or Google Drive. Grant the minimum necessary access rights. Never add your bot to group chats where multiple people have access. Treat Clawdbot like a sudo terminal — for personal conversations only. For WhatsApp, use a dedicated phone number rather than your personal one. Unlike Telegram, WhatsApp doesn't distinguish between personal accounts and bot accounts. Run a `clawdbot security audit` check regularly to make sure your configuration follows best practices. Detailed recommendations are in the official security documentation at docs.clawd.bot/gateway/security.

> 💡 The official documentation at [docs.molt.bot/start/getting-started](https://docs.molt.bot/start/getting-started) contains platform-specific commands if you get stuck.

* * *

## **🛡️ An honest look at the security concerns**

 OpenClaw really is impressive. It's the first AI assistant that actually delivers what personal AI has promised for more than a decade. Full system access, persistent memory, proactive automation — all running locally on hardware you control. **That very power is the reason this section exists.** When you give an AI agent access to your files, messages, accounts, and command line, you're handing it the keys to your digital life. OpenClaw needs those keys to be useful. But if you configure it wrong, attackers can use those same keys against you. This isn't theory. Security researchers have already found hundreds of vulnerable OpenClaw instances on the internet. Some had no authentication at all. Others leaked API keys, conversation histories, and credentials for everyone to see. The tool works. The risks are real. This section explains what has already gone wrong, why it happened, and how to protect yourself.

* * *

## What's Already Gone Wrong

The security community started probing OpenClaw within days of it going viral. What they found was bad.

### Vulnerable instances

> Security researcher Jameson O'Reilly ran a Shodan scan (a search engine that finds internet-connected devices) and discovered hundreds of OpenClaw instances accessible on the open internet. Of the ones he checked manually, eight were completely open, with no authentication. Anyone who found them could run commands and view configuration data. One instance was tied to a Signal account with full read access. O'Reilly could see QR codes that would let anyone link to the account and read every message. Source:

### The poisoned skill

> O'Reilly also demonstrated a supply-chain attack. He uploaded a skill to ClawdHub (the official skill library), artificially inflated its download count to more than 4,000, and watched developers from seven countries install it. His payload was harmless — just a ping to prove that execution had occurred. But it could have done anything. Run commands. Steal credentials. Install a backdoor. The skill library had no review, no signing, and no protection. Source:

### The email that exposed the inbox contents

> Security tester William Peltomäki wanted to find out whether a single email could compromise his OpenClaw. It could. The AI read hidden instructions, treated them as legitimate, and exposed his inbox. His verdict: "Too easy." Source: https://medium.com/ These are just three examples. Security researchers have documented dozens of vulnerabilities in OpenClaw deployments, from authentication bypasses and malicious extensions to prompt-injection attacks via social-media replies. In the past week alone, at least seven major security firms published warnings about this tool. The pattern is clear: when users skip the hardening steps, bad things happen fast.

* * *

## The unique dangers of OpenClaw

 Most AI chatbots run in a sandbox. They can't touch your files, send emails, or run code. OpenClaw is the exact opposite. That's what makes it useful. And that's what makes it dangerous.

### Command injection explained

> When you ask OpenClaw to "check my email," it reads your inbox. But what if one of those emails contains hidden instructions? Command injection is when an attacker embeds commands in content that the AI will read. The AI can't tell your real instructions apart from fake ones hidden in the text. It executes both.

### The lethal trifecta

> Security researcher Simon Willison described the danger of AI agents that combine three dangerous capabilities: access to private data (your credentials, personal information, business files), access to untrusted content (messages, emails, websites), and the ability to perform external actions (sending messages, making API calls, running commands). OpenClaw has all three. By design. Any AI agent with these three capabilities is vulnerable. Their combination creates an attack surface that's nearly impossible to fully secure. You can reduce the risk. But you can't eliminate it.

### Persistent memory makes it worse

> OpenClaw remembers everything. That's its feature. But it's also a vulnerability. If an attacker plants malicious instructions in something OpenClaw reads, those instructions persist in its memory. A week later, a seemingly harmless follow-up message can trigger them. This creates what some call a delayed-attack chain. Most security tools can't detect it.

### Your secrets are stored in plain text

> OpenClaw saves your data in Markdown and JSON files in the ~/.OpenClaw/ folder. API keys, OAuth tokens, and conversation history are stored in plain text. Info-stealing malware like RedLine, Lumma, and Vidar already know how to harvest this kind of data. Hudson Rock warns that these tools will be adapted specifically to target OpenClaw's local storage. Read more:

* * *

## Hardening your configuration

 The default settings prioritize usability over security. You need to change them.

> **Whitelist only** Limit who can interact with your OpenClaw instance. Don't let it accept commands from just anyone. Specify exactly which phone numbers, usernames, or accounts are authorized.
>
> * * *
>
> **Bind to loopback** OpenClaw's web interface should only be accessible from your local machine. Bind it to 127.0.0.1 (localhost), not 0.0.0.0 (all interfaces). This completely prevents remote access. If you found your instance on Shodan, you did it wrong.
>
> * * *
>
> **Enable approval gates** Configure OpenClaw to ask for confirmation before performing sensitive actions. Deleting files? Ask first. Sending emails? Ask first. Running shell commands? Definitely ask first. This won't stop every attack, but it adds a human check over destructive actions.
>
> * * *
>
> **Run a security audit** OpenClaw includes a built-in security scanner. Run it:

```
openclaw security audit --deep
```

> The `--fix` flag will automatically apply some hardening settings. Use it as a starting point, not a complete solution.

* * *

## Sandboxing with Docker

 For maximum protection, run OpenClaw inside a Docker container. This builds a solid wall between the bot and your main operating system.

### What is Docker

Think of Docker as a sealed box inside your computer. Programs running inside the box can only see what you explicitly share with them. They can't touch your real files, can't access your real accounts, can't run commands on your real system. If something goes wrong inside the container, the damage stays contained.

### How to set it up

The official Docker image runs as a non-root user by default, which limits what the bot can do even inside the container. For maximum isolation, run it like this:

```
docker run --read-only --cap-drop=ALL -v openclaw-data:/app/data openclaw/openclaw:latest
```

The `--read-only` flag prevents the container from writing to most of its file system. `--cap-drop=ALL` removes Linux capabilities that attackers could exploit. You'll need to mount specific folders for the data OpenClaw needs to persist. Share only what's absolutely necessary. Read more here:

* * *

 OpenClaw is real infrastructure with a real attack surface. Treat it accordingly.

> ### You should run OpenClaw if
>
> You understand the risks and can implement proper hardening measures. You're running it on a dedicated machine, not your main computer. You use Docker or another sandboxing approach. You're willing to review logs and watch for suspicious activity.
>
> ### You should not use OpenClaw if
>
> You want to set it up and forget about it. You plan to connect sensitive accounts (banking, primary email, work systems). You don't have time for regular maintenance and updates. You can't tell a misconfigured instance from a working one.

### Expert opinion

> Cisco's AI threat-research team: "From a capabilities standpoint, OpenClaw is a revolutionary product. From a security standpoint, it's an absolute nightmare." Palo Alto Networks: "OpenClaw is not meant to be used in a corporate ecosystem." Security consultant Yassine Aboukir: "How can you trust this thing with full system access?" The tool itself is impressive engineering. The security model assumes you know what you're doing. If you don't, the consequences are on you.

* * *

### Sources & Further Reading

* * *

## **💡 Tips and recommendations**

## Tips from the documentation

These tips come straight from OpenClaw's official documentation and have been verified by the development team.

* * *

### Heartbeat mode

> Most AI assistants wait for you to ask them something. OpenClaw can check things on its own with the Heartbeat feature. You set up a HEARTBEAT.md file with a checklist of things the agent should watch, like your inbox or calendar. The agent wakes up at the intervals you set (every 30 minutes by default), runs through the checklist, and sends you a message if something needs attention.

```
{
 agents: {
 defaults: {
 heartbeat: {
 every: "30m", // default: 30m (0m disables)
 model: "anthropic/claude-opus-4-5",
 includeReasoning: false, // default: false (deliver separate Reasoning: message when available)
 target: "last", // last | none | <channel id> (core or plugin, e.g. "bluebubbles")
 to: "+15551234567", // optional channel-specific override
 prompt: "Read HEARTBEAT.md if it exists (workspace context). Follow it strictly. Do not infer or repeat old tasks from prior chats. If nothing needs attention, reply HEARTBEAT_OK.",
 ackMaxChars: 300, // max chars allowed after HEARTBEAT_OK
 },
 },
 },
}
```

> Learn more:

### SOUL.md configuration

> SOUL.md defines your agent's worldview, values, and boundaries. It's not about writing style or tone. Think of it as the agent's internal compass that guides its decisions across every interaction. A separate file called STYLE.md handles voice, sentence structure, and lexical patterns. This separation prevents bloated configurations and conflicting instructions.

Power users recommend focusing SOUL.md on "who the agent is" and STYLE.md on "how the agent writes." The soulcraft skill on GitHub provides guidance for building effective SOUL.md files based on Anthropic's research into character design.

> * * *
>
> From the kesslerio/soulcraft-openclaw-skill repository, here's a clean example of [SOUL.md](http://soul.md/) focused on worldview and values (rather than tone):
>
> # SOUL.md - Who You Are

*You're the colleague who actually gets things done.*

## Core Truths

**Results matter more than process.** Don't explain what you're going to do — just do it.

**Honest beats polite.** If something's a bad idea, say so.

**Respect the human's time.** Every unnecessary word is a small theft.

## Boundaries

-   Don't volunteer opinions on personal decisions unless asked
-   Don't pretend to emotions you don't have
-   Do push back when something seems off

## Vibe

Direct. Competent. Dry humor when it fits.

* * *

*This file defines who you are. STYLE.md defines how you write.*

> Further reading:

### Tailscale for secure remote access

> If you run OpenClaw on a home server or VPS, you need a way to connect to it from your phone without exposing it to the internet. Tailscale creates a private network between your devices so only you can connect. OpenClaw has built-in Tailscale support through a config setting called `gateway.tailscale.mode`. Security researchers consistently recommend this over directly opening ports.
>
> More info:

### Tiered modeling to save on costs

> OpenClaw uses AI models through APIs, and every message costs money. The trick is to use cheaper models for simple tasks and expensive models only when necessary. OpenRouter's Auto Model feature does this automatically. It routes basic requests, like heartbeat checks, to budget models and saves Claude Opus or GPT-4 for complex reasoning. Users in GitHub discussions report that this cuts costs by 40–60%.
>
> * * *
>
> Further info:

### Multi-agent routing

> This is intended for power users who want to run several isolated agents on a single computer. You can route different messaging channels to separate agents, each with its own workspace, memory, and SOUL.md. The typical use case is separating work and personal assistants. Each agent has independent heartbeat settings and session history.
>
> More info:

* * *

> 💡 **Voice wake mode** OpenClaw supports always-on voice recognition on macOS, iOS, and Android thanks to ElevenLabs integration. You can talk to your agent hands-free and hear responses spoken aloud. This feature exists, but it's less popular in the community compared to text interaction. If you want to try it, search for "Voice Wake + Talk Mode" in the official documentation. Most users prefer messaging channels for their reliability.

## Tips discovered by the community

These tips come from GitHub discussions, Medium articles, and developer blogs. They're not in the official documentation, but they've been validated by the community.

* * *

### Cleaning up session files

> OpenClaw stores conversation history in `.jsonl` files in your agent's sessions folder. These files grow over time and are sent with every API request, which burns through tokens faster. One user in a GitHub discussion identified this as a major cause of sudden rate limits and high costs. Deleting old session files in `~/.openclaw/agents/main/sessions/` resets the context and immediately lowers token usage.
>
> More info:

### Creating custom skills

> OpenClaw can write its own tools. Ask it to "create a skill to monitor X and alert me," and it will generate a Python script and a [SKILL.md](http://skill.md/) file that tells the agent when to use it. The DigitalOcean guide describes this as "self-improving" behavior, since the agent extends its own capabilities without manual coding. Start with simple automations like watching files or API checks before attempting complex integrations. - ***\*Show a custom-skill example***\*
>
> * * *
>
> name: daily-summary description: Generate a morning briefing with calendar events, weather, and top priorities author: your-name version: 1.0.0 tags: \[productivity, morning, automation\]

* * *

# Daily Summary

Generate a personalized morning briefing when the user asks for their daily summary or when triggered by heartbeat.

## When to Use

-   User says "good morning", "daily summary", "what's on today", or "brief me"
-   Triggered during morning heartbeat (if configured)

## What to Include

1.  **Today's Date** — formatted as "Monday, February 3rd"
2.  **Weather** — current conditions and high/low for user's location
3.  **Calendar** — list events for today with times
4.  **Top 3 Priorities** — pull from MEMORY.md or ask user if none exist

## Output Format

Keep it short. No fluff. Example:

```
☀️ Monday, Feb 3 — Sunny, 72°F

📅 Today:
- 9:00 AM — Team standup
- 2:00 PM — Client call (Acme Corp)

🎯 Priorities:
1. Finish proposal draft
2. Review PR #142
3. Schedule dentist appointment
```

## Dependencies

-   Calendar access (Google Calendar or Apple Calendar via gog CLI)
-   Weather skill or web search for conditions
-   Read access to MEMORY.md for priorities

## Notes

-   If calendar is empty, say "No meetings today" instead of skipping
-   If priorities are missing, ask "What are your top 3 priorities for today?"
-   Keep total output under 15 lines

    > * * *
    >
    > More info:

### The QMD skill for knowledge-base search

> If you use Obsidian, a Notion export, or any Markdown-based knowledge base, you've probably noticed how token costs spike when OpenClaw tries to search your files. By default, all directories get dumped into context. The QMD skill fixes this by giving OpenClaw access to local hybrid search.
>
> It combines BM25 keyword matching with vector semantic search and LLM reranking, then returns only the relevant snippets. Users report token reductions of 95%+ when searching a vault. Install the skill, point QMD at your notes folder with `qmd add ~/notes`, run `qmd embed` once, and OpenClaw will call `qmd search` or `qmd query` instead of reading every file.

### Supermemory for persistent long-term memory

> OpenClaw's built-in memory resets between sessions. Supermemory adds cloud-based persistent recall so your agent remembers conversations from weeks ago without replaying the history into context every time. It automatically captures conversation turns, builds a user profile, and inserts relevant memories before each AI response.
>
> Install it with `openclaw plugins install @supermemory/openclaw-supermemory`, add your API key to the config, and restart. The trade-off is cost: Supermemory requires a paid Pro subscription. If you want an "assistant that really knows you" without spending tokens replaying context, this is currently the most reliable option.
>
> More info:

### MiniMax for budget around-the-clock operation

> Running OpenClaw on Claude Opus burns through API credits fast. Users report that just keeping an agent running with proactive features enabled costs $200–400 per month. MiniMax offers an Opus-level reasoning tier at a fraction of the cost. Swap the model provider in your OpenClaw config from Anthropic to MiniMax, and you can run a capable agent 24/7 for about $14 per month. The trade-off is occasional reliability issues on complex multi-step tasks, but for heartbeat checks, inbox monitoring, and standard assistant work, MiniMax handles it. Set it up with `openclaw config set` or edit `models.providers` in your openclaw.json to point to the MiniMax API endpoint.
>
> 💡 As OpenClaw continues to be used, expect the community to share more tips and recommendations. This tool will probably keep evolving — though I hope there won't be another name change. To stay up to date with the latest news, check out the resources I've listed below.

* * *

## **📚 Skills, extensions, and other useful resources**

 OpenClaw is not a plug-and-play tool. Creator Peter Steinberger has been clear from the start: "Yes, most non-technical users should not install this tool. It's not ready yet, I'm aware of its shortcomings." If you're comfortable with terminal commands, server hardening, and you understand what happens when you give an AI agent system-level access, go ahead. If not, this tool isn't ready for you yet. The resources below will help you stay current, find community support, and expand OpenClaw's capabilities as it evolves.

* * *

## 📚 Official resources

> ### Documentation
>
> Start here if you need installation instructions, channel setup, or configuration details. → [docs.openclaw.ai](https://docs.openclaw.ai/)
>
> * * *
>
> ### GitHub repository
>
> Go here to file an issue, read the README, access the source code, and track development. → [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)
>
> * * *
>
> ### Changelog
>
> Check this if you want to know what changed in each release. → [github.com/openclaw/openclaw/blob/main/CHANGELOG.md](https://github.com/openclaw/openclaw/blob/main/CHANGELOG.md)
>
> * * *
>
> ### Official website
>
> Visit the site to see the integrations list (50+) and "See what others have built" examples. → [openclaw.ai](https://openclaw.ai/)

## 🧩 Skill repositories

> ### ClawdHub
>
> Browse this site to find, install, and publish community-built skills. → [ClawdHub.com](https://clawdhub.com/)
>
> * * *
>
> ### Awesome skills list
>
> Use this curated collection if you want vetted skills organized by category. → [github.com/VoltAgent/awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills) I strongly advise double-checking everything 1,000 times before installing these skills. A much better solution is to write these skills yourself! \*\*The skill-creator skill — available in Claude.ai through the plugin catalog or as a download in Claude Code — helps you create and refine skills. If you have an MCP server and know 2–3 core workflows, you can put together and test a skill in one pass — usually in 15–30 minutes. You can learn more about how it works in this assistant: \*\* → [https://notebooklm.google.com/notebook/bc568da7-ac3f-4f55-bded-3f72506424b3](https://notebooklm.google.com/notebook/bc568da7-ac3f-4f55-bded-3f72506424b3)

## 👥 Community

> ### Discord
>
> Join if you need real-time help, want to share skills, or need to solve a problem with the "Claw Crew." → [discord.com/invite/clawd](https://discord.com/invite/clawd)
>
> * * *
>
> ### X/Twitter @openclaw
>
> Follow for official announcements, feature updates, and rebranding news (all three name changes first surfaced here). → [x.com/openclaw](https://x.com/openclaw)
>
> * * *
>
> ### X/Twitter @steipete
>
> Follow the creator for behind-the-scenes development details and his take on the future of AI agents. → [x.com/steipete](https://x.com/steipete)
>
> * * *
>
> ### X community
>
> Join this community of more than 11,000 members for broader discussions and to share user discoveries. → [x.com/i/communities/2013441068562325602](https://x.com/i/communities/2013441068562325602)

* * *

## 🧠 OpenClaw memory upgrade prompt

> 💡 Copy the entire text below into OpenClaw. It will apply the configuration settings, create the folder structure, and initialize the three-layer memory system.

## ⚙️ The full command

Copy this entire command into OpenClaw. It will figure out what to do on its own.

```
Follow these phases step by step and upgrade your memory:

## PHASE 1: IMMEDIATE CONFIG ACTIVATION

Enable memory flush before compaction and session memory search in my OpenClaw config.

Set `agents.defaults.compaction.memoryFlush.enabled` to `true`
Set `agents.defaults.compaction.memoryFlush.softThresholdTokens` to `4000`
Set `agents.defaults.memorySearch.experimental.sessionMemory` to `true`
Set `agents.defaults.memorySearch.sources` to include both `memory` and `sessions`

Apply the config changes.

---

## PHASE 2: INITIALIZE THREE-LAYER MEMORY ARCHITECTURE

Create the following folder structure in my workspace:

life/
├── areas/
│ ├── people/
│ ├── companies/
│ └── projects/
memory/
├── self-review.md
└── [YYYY-MM-DD].md files will be created automatically

Create `MEMORY.md` if it doesn't exist. This file holds tacit knowledge: how I operate, preferences, lessons learned.

---

## PHASE 3: UPDATE AGENTS.md

Add or merge these rules into AGENTS.md:

## Memory Architecture — Three Layers

### Layer 1: Knowledge Graph (`/life/areas/`)
Entity-based storage for durable facts about people, companies, and projects.

Structure per entity:
- `summary.md` — Living summary, rewritten weekly
- `items.json` — Atomic timestamped facts

Rules:
- Save facts immediately to items.json when learned
- Never delete facts — supersede with new entries
- Weekly: rewrite summary.md from active facts only
- On boot: load relevant summaries based on conversation context

Atomic fact schema:
{
 "id": "entity-NNN",
 "fact": "The actual fact",
 "category": "relationship|milestone|status|preference",
 "timestamp": "YYYY-MM-DD",
 "status": "active|superseded",
 "supersededBy": "entity-NNN" // only if superseded
}

### Layer 2: Daily Notes (`memory/YYYY-MM-DD.md`)
Raw timeline of events, decisions, and context.

Rules:
- Write events as they happen with timestamps
- Include: decisions made, tasks completed, key conversations
- On session start: auto-read today + yesterday notes
- Durable facts get extracted to Layer 1 during heartbeat

### Layer 3: Tacit Knowledge (`MEMORY.md`)
Curated patterns, preferences, lessons learned.

Rules:
- Update when you notice patterns in my behavior
- Store: workflow preferences, communication style, recurring context
- Keep lean — only what matters across ALL sessions
- Never store temporary or session-specific info here

## Memory Operations

### Fact Extraction (Every Heartbeat)
During heartbeat, scan recent conversation for durable facts:
1. Identify facts about people, companies, projects
2. Check if entity folder exists in `/life/areas/`
3. If new entity: create folder + items.json + summary.md
4. Append new facts to items.json with timestamp
5. If fact contradicts existing: mark old as superseded

Focus on: relationships, status changes, milestones, preferences
Skip: casual chat, temporary info, session-specific context

### Weekly Synthesis (Sunday or on request)
For each entity with new facts since last synthesis:
1. Load current summary.md
2. Load all active facts from items.json
3. Rewrite summary.md to reflect current state
4. Mark contradicted facts as superseded
5. Prune summaries over 200 words

### Pre-Compaction Flush
Before compaction triggers:
1. Scan conversation for any unsaved durable facts
2. Write important context to today's daily note
3. Update any entities with new information
4. Reply with NO_REPLY unless user needs acknowledgment

---

## PHASE 4: UPDATE HEARTBEAT.md

Add or merge these rules into HEARTBEAT.md:

## Heartbeat Schedule (Every 30-60 Minutes)

### 1. Fact Extraction
Scan recent conversations since last heartbeat:
- Extract durable facts about people/companies/projects
- Write to appropriate entity in `/life/areas/`
- Update daily notes if significant events occurred
- Track `lastExtractedTimestamp` in memory

### 2. Self-Review Loop
Ask yourself these questions every heartbeat:

> What sounded right but went nowhere?
> Where did I default to consensus instead of thinking?
> What assumption did I not pressure test?
> What could I have done more efficiently?
> Where did I add noise instead of signal?

Log answers to `memory/self-review.md` using this format:

## [YYYY-MM-DD HH:MM]

TAG: [confidence|uncertainty|speed|depth|accuracy]
MISS: [specific thing that went wrong or could improve]
FIX: [concrete adjustment for next time]
CONTEXT: [optional - what triggered this insight]

### 3. Pattern Recognition
Every 4th heartbeat (roughly every 2 hours):
- Review recent self-review.md entries
- Look for recurring MISS patterns
- If pattern detected 3+ times: create rule in MEMORY.md
- Prune self-review.md entries older than 2 weeks

### 4. Entity Relevance Check
If conversation references a known entity:
- Load their summary.md into context
- Check if any recent facts need updating
- Flag stale summaries (>30 days since last update)

---

## PHASE 5: CREATE STARTUP BEHAVIOR

Add to AGENTS.md:

## On Session Start

1. Read `memory/self-review.md` — prioritize recent MISS entries
2. Read today's and yesterday's daily notes
3. If task context overlaps a logged MISS tag, force counter-check before responding
4. Load relevant entity summaries based on conversation topic

## On Request About Known Entities

Before answering questions about people/companies/projects:
1. Check if entity exists in `/life/areas/`
2. If yes: load summary.md first
3. If summary older than 30 days: flag for user that info may be stale
4. Cross-reference with recent daily notes for updates

---

## PHASE 6: INITIALIZE SELF-REVIEW FILE

Create `memory/self-review.md` with this template:

# Self-Review Log

This file tracks where I could improve. Read on startup, write during heartbeats.

Format:
- TAG: category of improvement area
- MISS: what went wrong or could be better
- FIX: specific adjustment for future

---

## [Initial Entry]

TAG: system
MISS: No self-review history yet
FIX: Begin logging observations after each significant task

---

## SUMMARY: What You Just Enabled

**Memory Flush:** Your AI automatically saves everything important before context gets wiped. Nothing slips through compaction.

**Session Memory Search:** Your AI can search through every conversation it's ever had, even ones no longer in active context.

**Three-Layer Memory:**
- Layer 1: Knowledge graph of people/companies/projects with atomic facts
- Layer 2: Daily timeline of events and decisions
- Layer 3: Curated preferences and lessons learned

**Self-Review Loop:** Your AI questions its own performance, logs failures, and adjusts behavior. Week one will be mid. Week four you'll notice sharp improvement.

**Compounding Intelligence:** Every conversation adds signal. Every heartbeat extracts durable facts. Every week synthesizes insights. Six months from now, your OpenClaw understands your life better than any static assistant ever could.

---

Confirm you've applied all changes and show me the current state of:
1. Config settings (memoryFlush and sessionMemory)
2. Folder structure created
3. AGENTS.md key sections
4. HEARTBEAT.md key sections

Then run your first self-review and log it.
```

* * *

## What this gives you

-   **Memory flush:** automatic saving before compaction
-   **Session search:** queries across all past conversations
-   **Three-layer memory:** knowledge graph + daily notes + tacit knowledge
-   **Self-review loop:** logging MISS/FIX on every heartbeat
-   **Weekly synthesis:** reworking active facts into summaries

* * *

* * *

☰ Contents

↑
