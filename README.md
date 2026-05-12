# BagSmith AI

BagSmith AI is an AI launch operating system for creator coins on Bags. It helps creators design responsible coin utilities, generate launch campaigns, connect a Solana wallet, and inspect live token data before they submit a Bags-native launch.

> Hackathon requirement: launch the project on Bags and replace the placeholder Bags URL in the demo with the live BagSmith AI Bags project link.

## One-Line Pitch

BagSmith AI helps creators design, launch, and grow Bags creator coins with AI-generated strategy, campaign planning, responsible utility design, wallet connection, and live Solana token checks.

## Problem

Creator coins are powerful, but most creators do not know how to turn a coin into a clear product experience. They need help with positioning, utility design, launch messaging, community tasks, risk boundaries, and post-launch growth signals.

Without that support, launches can become vague, speculative, or hard for fans to understand.

## Solution

BagSmith AI gives creators a guided launch workspace:

- **Design**: Turn a creator brief into a coin name, symbol, positioning, utility rules, and risk notes.
- **Launch**: Generate campaign posts, community tasks, and drop ideas for launch week.
- **Grow**: Review holder, volume, task, and sentiment signals in a dashboard.
- **Verify**: Connect a Phantom wallet and look up live Solana token mint data.

## Features

- Creator brief form
- OpenAI-backed launch plan generator with local fallback
- Coin utility and responsible launch note builder
- Campaign board for posts, tasks, and drops
- Growth dashboard with demo metrics and AI next actions
- Real Phantom wallet connection
- Live Solana token mint supply lookup
- Bags project URL and description analyzer
- Launch proof module for the live Bags project URL
- Square app icon for hackathon submission
- No dependency install required

## Name

"Smith" means crafting. BagSmith AI helps creators craft better Bags coin launches.

## Requirements

- Node.js 18+
- Phantom browser extension for the wallet demo
- Optional: OpenAI API key for live AI generation

## Bags Fit

BagSmith AI is built around the Bags creator coin workflow. It helps more creators enter the Bags ecosystem with clearer launch plans, stronger holder utility, safer messaging, and repeatable campaign operations.

For submission, BagSmith AI should be launched on Bags. Paste the live Bags project URL into the in-app Bags Project Analyzer and click **Save as launch proof** so the demo shows a direct link to the launched Bags project.

The current MVP focuses on the launch operating layer. The next integration step is to connect Bags-specific project metadata once the hackathon API or SDK surface is available.

## Tech Stack

- HTML, CSS, and vanilla JavaScript
- Node.js HTTP server
- Phantom wallet browser provider
- Server-side Solana JSON-RPC `getTokenSupply` proxy
- OpenAI Responses API endpoint with local fallback generation

## Run Locally

No dependency install is required.

```bash
cd C:\Users\Fe\Desktop\web3
node server.js
```

Open:

```text
http://localhost:3000
```

## Optional OpenAI Setup

Set an OpenAI API key before running the server:

```powershell
$env:OPENAI_API_KEY="your_api_key_here"
node server.js
```

You can override the model:

```powershell
$env:OPENAI_MODEL="gpt-4.1-mini"
node server.js
```

If no API key is set, the browser uses the local deterministic generator so the demo still works.

## Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md). Use a Node-capable host such as Render, Railway, or Fly.io so `/api/launch-plan` can run.

## Demo Flow

1. Open BagSmith AI and describe a creator.
2. Generate the AI launch kit.
3. Show the Bags positioning, utility rules, and responsible launch notes.
4. Open the campaign board and switch between posts, tasks, and drops.
5. Connect Phantom wallet.
6. Open the dashboard and look up a live Solana token mint.
7. Open the Bags project URL from the Launch Proof module.
8. Explain how BagSmith AI helps creators launch clearer Bags-native coins.

## Before Submitting

- Launch BagSmith AI on Bags.
- Add the live Bags project URL to the app using **Save as launch proof**.
- Add the same Bags project URL to DoraHacks under coin/project details.
- Record the demo video with the Bags project page visible.
- Deploy the app and add the deployed URL to DoraHacks.

## Example Solana Mint

USDC mint:

```text
EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
```

## Roadmap

- Connect Bags project metadata and creator coin profiles
- Add one-click export for launch plans and campaign calendars
- Add token-gated task verification
- Add holder cohort analysis
- Add campaign performance comparison across launches

## Responsible Launch Principles

BagSmith AI avoids investment language, profit promises, and price speculation. The product frames creator coins as access, participation, contribution, and community coordination tools.
