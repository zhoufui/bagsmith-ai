const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = Number(process.env.PORT || 3000);
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const ROOT = __dirname;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function extractJson(text) {
  const fenced = text.match(/```json\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("Model did not return JSON");
  }
  return JSON.parse(raw.slice(start, end + 1));
}

async function createLaunchPlan(input) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const prompt = {
    role: "user",
    content: [
      "Generate a Bags-native creator coin launch plan as strict JSON.",
      "Return this exact shape: { symbol, coinName, summary, positioningTitle, positioningText, bagsIntegration, utilityRules, riskNotes, insights, campaign: { posts, tasks, drops } }.",
      "campaign posts/tasks/drops must each be arrays of three objects with title, body, meta.",
      "Avoid investment language, profit promises, or price speculation.",
      `Creator brief: ${JSON.stringify(input)}`,
    ].join("\n"),
  };

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input: [
        {
          role: "system",
          content:
            "You are a product strategist for Solana creator tools. Output only valid JSON with practical, responsible launch guidance.",
        },
        prompt,
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const text =
    data.output_text ||
    data.output
      ?.flatMap((item) => item.content || [])
      .map((content) => content.text || "")
      .join("\n");

  return extractJson(text || "");
}

async function getTokenSupply(mint) {
  const rpcUrls = [
    "https://api.mainnet-beta.solana.com",
    "https://solana-rpc.publicnode.com",
    "https://rpc.ankr.com/solana",
  ];

  let lastError = "No Solana RPC response";

  for (const rpcUrl of rpcUrls) {
    try {
      const response = await fetch(rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "bagsmith-token-supply",
          method: "getTokenSupply",
          params: [mint],
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        lastError = data.error?.message || `Solana RPC error ${response.status}`;
        continue;
      }

      return { ...data.result.value, source: rpcUrl, live: true };
    } catch (error) {
      lastError = error.message;
    }
  }

  if (mint === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v") {
    return {
      amount: "0",
      decimals: 6,
      uiAmount: null,
      uiAmountString: "USDC mint recognized; live RPC unavailable in this environment",
      source: "demo fallback",
      live: false,
    };
  }

  throw new Error(lastError);
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = path.resolve(ROOT, `.${pathname}`);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const contentType = mimeTypes[path.extname(filePath)] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/launch-plan") {
    try {
      const body = await readBody(req);
      const input = JSON.parse(body || "{}");
      const plan = await createLaunchPlan(input);
      sendJson(res, 200, { plan });
    } catch (error) {
      sendJson(res, 500, { error: error.message });
    }
    return;
  }

  if (req.method === "POST" && req.url === "/api/token-supply") {
    try {
      const body = await readBody(req);
      const input = JSON.parse(body || "{}");

      if (!input.mint || typeof input.mint !== "string") {
        sendJson(res, 400, { error: "Missing token mint address" });
        return;
      }

      const supply = await getTokenSupply(input.mint.trim());
      sendJson(res, 200, { supply });
    } catch (error) {
      sendJson(res, 500, { error: error.message });
    }
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`BagSmith AI running at http://localhost:${PORT}`);
  if (!process.env.OPENAI_API_KEY) {
    console.log("OPENAI_API_KEY is not set; the browser will use the local generator fallback.");
  }
});
