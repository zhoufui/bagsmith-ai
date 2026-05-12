const state = {
  creatorName: "Mira Sound Lab",
  category: "Music creator",
  audience: "lo-fi listeners, remix artists, and early Solana collectors",
  goal: "Fund a collaborative sample pack, reward remix contributors, and build a token-gated listening club on Bags.",
  tone: "Polished and creator-first",
  utilities: ["member drops", "community voting", "content unlocks", "bounty rewards"],
  walletConnected: false,
  walletAddress: "",
  campaignView: "posts",
  aiPlan: null,
  bagsProjectUrl: localStorage.getItem("bagsmith-bags-url") || "",
};

const samples = [
  {
    creatorName: "Mira Sound Lab",
    category: "Music creator",
    audience: "lo-fi listeners, remix artists, and early Solana collectors",
    goal: "Fund a collaborative sample pack, reward remix contributors, and build a token-gated listening club on Bags.",
    tone: "Polished and creator-first",
  },
  {
    creatorName: "Forge Quest",
    category: "Indie game studio",
    audience: "speedrunners, pixel art fans, and quest modders",
    goal: "Launch a player-owned item economy and reward level creators through Bags.",
    tone: "Playful and meme-native",
  },
  {
    creatorName: "Chain Class",
    category: "AI educator",
    audience: "builders learning agents, Solana apps, and creator monetization",
    goal: "Create a learning coin for cohorts, office hours, and builder bounties.",
    tone: "Community-led and warm",
  },
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function slugSymbol(name) {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 5)
    .toUpperCase() || "BAGS";
}

function readForm() {
  state.creatorName = $("#creatorName").value.trim() || "Untitled Creator";
  state.category = $("#category").value;
  state.audience = $("#audience").value.trim() || "early community members";
  state.goal = $("#goal").value.trim() || "Launch a creator coin on Bags.";
  state.tone = $("#tone").value;
  state.utilities = $$('input[name="utility"]:checked').map((input) => input.value);
}

function makePlan() {
  if (state.aiPlan) {
    return {
      symbol: state.aiPlan.symbol || slugSymbol(state.creatorName),
      coinName: state.aiPlan.coinName || `${state.creatorName} Coin`,
      summary: state.aiPlan.summary || `A Bags-native coin for ${state.audience}.`,
      positioningTitle: state.aiPlan.positioningTitle || `${state.category} launch engine`,
      positioningText: state.aiPlan.positioningText || "",
      bagsIntegration: state.aiPlan.bagsIntegration || "",
      utilityRules: state.aiPlan.utilityRules || [],
      riskNotes: state.aiPlan.riskNotes || [],
      insights: state.aiPlan.insights || [],
    };
  }

  const symbol = slugSymbol(state.creatorName);
  const utilityText = state.utilities.length ? state.utilities.join(", ") : "community rewards";

  return {
    symbol,
    coinName: `${state.creatorName} Coin`,
    summary: `A Bags-native ${state.category.toLowerCase()} coin for ${utilityText}, built around ${state.audience}.`,
    positioningTitle: `${state.category} launch engine`,
    positioningText: `${state.creatorName} should position the coin as a participatory launch pass, not a passive asset. The message: holders get closer to the creative process, contributors get visible rewards, and Bags becomes the public home for launch activity.`,
    bagsIntegration: `Use Bags as the launch surface for the coin profile, holder calls to action, bounty announcements, and weekly campaign updates. The product demo frames Bags as the place where creator intent becomes visible on-chain participation.`,
    utilityRules: [
      `Reserve the first holder benefit for ${state.utilities[0] || "early access"} so the first action is easy to understand.`,
      "Give contributors reputation-weighted rewards for completing public tasks before adding complex financial mechanics.",
      "Use holder votes for creative direction, drop themes, or guest collaborations.",
      "Publish a simple weekly reward budget and keep all campaign claims auditable.",
    ],
    riskNotes: [
      "Avoid promises of profit or guaranteed returns in launch copy.",
      "Describe the coin as access, participation, and community coordination.",
      "Use staged rewards so the creator can learn before scaling incentives.",
    ],
    insights: [
      `Strong fit between ${state.category.toLowerCase()} audience and repeat participation.`,
      "Best first campaign: contributor bounties with visible holder benefits.",
      "Recommended launch window: announce 72 hours before mint and open tasks immediately.",
    ],
  };
}

function makeCampaign() {
  if (state.aiPlan?.campaign) {
    return {
      posts: state.aiPlan.campaign.posts || [],
      tasks: state.aiPlan.campaign.tasks || [],
      drops: state.aiPlan.campaign.drops || [],
    };
  }

  const symbol = slugSymbol(state.creatorName);
  return {
    posts: [
      {
        title: "Launch announcement",
        body: `${state.creatorName} is launching ${symbol} on Bags to turn fans into active collaborators. Holders unlock early drops, votes, and contributor rewards.`,
        meta: "X / Day 1",
      },
      {
        title: "Utility thread",
        body: `Explain the first three holder utilities: ${state.utilities.slice(0, 3).join(", ") || "member access, votes, and rewards"}. Keep each benefit tied to one clear action.`,
        meta: "X / Day 2",
      },
      {
        title: "Proof of work recap",
        body: "Share the first completed community tasks, spotlight top contributors, and invite new holders into the next bounty cycle.",
        meta: "X / Day 5",
      },
    ],
    tasks: [
      {
        title: "Contributor bounty",
        body: `Ask holders to submit one useful asset for the launch: remix, meme, tutorial, landing copy, or local community intro.`,
        meta: "150 points",
      },
      {
        title: "Holder vote",
        body: "Run a Bags-linked vote on the first community drop theme and publish the winner with a clear timeline.",
        meta: "90 points",
      },
      {
        title: "Referral proof",
        body: "Reward verified community invites that lead to wallet-connected launch activity, not raw follower counts.",
        meta: "60 points",
      },
    ],
    drops: [
      {
        title: "Genesis holder drop",
        body: `A small limited reward for the first ${symbol} holders who complete launch-week participation tasks.`,
        meta: "Week 1",
      },
      {
        title: "Builder spotlight",
        body: "Feature five contributors on the Bags profile and give them a public role in the next campaign round.",
        meta: "Week 2",
      },
      {
        title: "Community unlock",
        body: "Release a gated asset once holders complete a collective milestone across tasks and votes.",
        meta: "Week 3",
      },
    ],
  };
}

function makeActions() {
  return [
    {
      title: "Move from awareness to contribution",
      body: "The dashboard shows growing holders but uneven task completion. Put one bounty above the fold on the Bags project page.",
    },
    {
      title: "Tighten the next utility promise",
      body: `Lead with ${state.utilities[0] || "member rewards"} and delay lower-signal benefits until the second weekly update.`,
    },
    {
      title: "Publish a founder note",
      body: "A short founder update will make the coin feel creator-led instead of campaign-led.",
    },
  ];
}

function renderList(selector, items) {
  const list = $(selector);
  list.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function renderInsights(plan) {
  $("#quickInsights").innerHTML = plan.insights
    .map((item) => `<div class="insight-item">${item}</div>`)
    .join("");
}

function renderCampaign() {
  const campaigns = makeCampaign();
  $("#campaignGrid").innerHTML = campaigns[state.campaignView]
    .map(
      (card) => `
        <article class="campaign-card">
          <h3>${card.title}</h3>
          <p>${card.body || card.text}</p>
          <div class="campaign-meta">
            <span>${card.meta}</span>
            <span>${slugSymbol(state.creatorName)}</span>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderChart() {
  const values = [28, 36, 42, 51, 64, 58, 73, 79, 88, 96];
  $("#barChart").innerHTML = values
    .map((value, index) => `<div class="bar" style="height:${value}%" data-label="D${index + 1}"></div>`)
    .join("");
}

function renderActions() {
  $("#nextActions").innerHTML = makeActions()
    .map(
      (action) => `
        <article class="action-card">
          <strong>${action.title}</strong>
          <p>${action.body}</p>
        </article>
      `,
    )
    .join("");
}

function renderBagsProof() {
  const link = $("#bagsProofLink");
  const text = $("#bagsProofText");

  if (!state.bagsProjectUrl) {
    link.href = "https://bags.fm/";
    link.textContent = "Add Bags URL";
    link.classList.add("disabled");
    text.textContent = "Add your Bags project URL after launching BagSmith AI on Bags.";
    return;
  }

  link.href = state.bagsProjectUrl;
  link.textContent = "View Bags launch";
  link.classList.remove("disabled");
  text.textContent = `Launch proof connected: ${state.bagsProjectUrl}`;
}

function render() {
  const plan = makePlan();
  $("#coinSymbol").textContent = plan.symbol;
  $("#coinName").textContent = plan.coinName;
  $("#coinSummary").textContent = plan.summary;
  $("#positioningTitle").textContent = plan.positioningTitle;
  $("#positioningText").textContent = plan.positioningText;
  $("#bagsIntegration").textContent = plan.bagsIntegration;
  $("#readiness").textContent = `${Math.min(94, 72 + state.utilities.length * 4)}%`;
  $("#fitScore").textContent = state.utilities.length >= 4 ? "A" : "B+";
  renderList("#utilityRules", plan.utilityRules);
  renderList("#riskNotes", plan.riskNotes);
  renderInsights(plan);
  renderCampaign();
  renderChart();
  renderActions();
  renderBagsProof();
}

async function generateAiPlan() {
  readForm();
  state.aiPlan = null;

  try {
    const response = await fetch("/api/launch-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creatorName: state.creatorName,
        category: state.category,
        audience: state.audience,
        goal: state.goal,
        tone: state.tone,
        utilities: state.utilities,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI request failed: ${response.status}`);
    }

    const data = await response.json();
    state.aiPlan = data.plan;
    render();
    showSection("plan");
    showToast("AI launch kit generated");
  } catch (error) {
    render();
    showSection("plan");
    showToast("Using local generator");
  }
}

function showSection(sectionId) {
  $$(".section").forEach((section) => section.classList.toggle("active", section.id === sectionId));
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.section === sectionId));
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function analyzeBagsProject() {
  const url = $("#bagsUrl").value.trim();
  const notes = $("#bagsNotes").value.trim();
  const source = notes || `${state.creatorName} ${state.category} ${state.goal}`;
  const analysis = $("#bagsAnalysis");

  const audienceHint = source.length > 120 ? "existing community signals" : state.audience;
  const utilityHint = state.utilities.slice(0, 3).join(", ") || "member access, tasks, and drops";

  analysis.innerHTML = `
    <strong>Bags launch analysis</strong><br />
    Source: ${url || "manual project notes"}<br /><br />
    <strong>Positioning:</strong> Frame the project as a creator participation layer for ${audienceHint}.<br />
    <strong>Utility:</strong> Lead with ${utilityHint}, then add deeper holder benefits after the first campaign proves demand.<br />
    <strong>Risk:</strong> Avoid price, return, or floor language. Keep copy focused on access, contribution, and coordination.<br />
    <strong>Campaign:</strong> Start with one announcement post, one contributor task, and one gated drop tied to visible Bags activity.
  `;
  showToast("Bags analysis generated");
}

function saveBagsUrl() {
  const url = $("#bagsUrl").value.trim();

  if (!url) {
    showToast("Paste a Bags URL first");
    return;
  }

  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("bags")) {
      showToast("Use a Bags project URL");
      return;
    }
  } catch {
    showToast("Enter a valid URL");
    return;
  }

  state.bagsProjectUrl = url;
  localStorage.setItem("bagsmith-bags-url", url);
  renderBagsProof();
  showToast("Bags launch proof saved");
}

function loadSample() {
  const sample = samples[Math.floor(Math.random() * samples.length)];
  Object.assign(state, sample);
  $("#creatorName").value = state.creatorName;
  $("#category").value = state.category;
  $("#audience").value = state.audience;
  $("#goal").value = state.goal;
  $("#tone").value = state.tone;
  render();
  showToast("Sample loaded");
}

$("#briefForm").addEventListener("submit", (event) => {
  event.preventDefault();
  generateAiPlan();
});

$("#generateTop").addEventListener("click", () => {
  generateAiPlan();
});

$("#loadSample").addEventListener("click", loadSample);

$("#walletButton").addEventListener("click", () => {
  connectWallet();
});

$$(".nav-item").forEach((item) => {
  item.addEventListener("click", () => showSection(item.dataset.section));
});

$$(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    state.campaignView = button.dataset.campaign;
    $$(".segment").forEach((item) => item.classList.toggle("active", item === button));
    renderCampaign();
  });
});

$("#copyPlan").addEventListener("click", async () => {
  const plan = makePlan();
  const pitch = `${plan.coinName}: ${plan.summary} ${plan.positioningText}`;
  try {
    await navigator.clipboard.writeText(pitch);
    showToast("Pitch copied");
  } catch {
    showToast("Pitch ready");
  }
});

$("#refreshMetrics").addEventListener("click", () => {
  $("#holdersMetric").textContent = (2300 + Math.floor(Math.random() * 700)).toLocaleString();
  $("#volumeMetric").textContent = `$${160 + Math.floor(Math.random() * 80)}K`;
  $("#tasksMetric").textContent = (7600 + Math.floor(Math.random() * 900)).toLocaleString();
  $("#sentimentMetric").textContent = 78 + Math.floor(Math.random() * 14);
  renderActions();
  showToast("Insight refreshed");
});

$("#analyzeBags").addEventListener("click", analyzeBagsProject);
$("#saveBagsUrl").addEventListener("click", saveBagsUrl);

async function connectWallet() {
  const provider = window.solana;

  if (!provider?.isPhantom) {
    showToast("Install Phantom wallet");
    window.open("https://phantom.app/", "_blank", "noopener,noreferrer");
    return;
  }

  try {
    const response = await provider.connect();
    state.walletConnected = true;
    state.walletAddress = response.publicKey.toString();
    $("#walletButton").classList.add("connected");
    $("#walletLabel").textContent = `${state.walletAddress.slice(0, 4)}...${state.walletAddress.slice(-4)}`;
    showToast("Wallet connected");
  } catch {
    showToast("Wallet connection cancelled");
  }
}

async function lookupMint() {
  const mint = $("#mintAddress").value.trim();
  const result = $("#tokenResult");

  if (!mint) {
    result.textContent = "Paste a Solana token mint address first.";
    return;
  }

  result.textContent = "Reading Solana mainnet...";

  try {
    const response = await fetch("/api/token-supply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mint }),
    });
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error || "Token lookup failed");
    }

    const supply = data.supply;
    const numericSupply = Number(supply.uiAmountString);
    const supplyLabel = Number.isFinite(numericSupply) ? numericSupply.toLocaleString() : supply.uiAmountString;
    result.innerHTML = `
      <strong>${supply.live ? "Live Solana token data" : "Solana token demo fallback"}</strong><br />
      Mint: ${mint}<br />
      Supply: ${supplyLabel}<br />
      Decimals: ${supply.decimals}<br />
      Source: ${supply.source || "Solana RPC"}
    `;
    showToast("Mint data loaded");
  } catch (error) {
    result.textContent = `Could not read this mint: ${error.message}`;
  }
}

$("#lookupMint").addEventListener("click", lookupMint);

render();
