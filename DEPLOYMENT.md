# Deployment Guide

BagSmith AI uses a small Node.js server for static files and the optional OpenAI API proxy, so deploy it on a host that can run Node services.

## Recommended Hosts

- Render
- Railway
- Fly.io

Static-only hosts can serve the UI, but `/api/launch-plan` will not work unless the Node server is running.

## Environment Variables

Required for live AI generation:

```text
OPENAI_API_KEY=your_api_key_here
```

Optional:

```text
OPENAI_MODEL=gpt-4.1-mini
PORT=3000
```

## Render Setup

Use these settings:

```text
Runtime: Node
Build command: none
Start command: npm start
```

Add `OPENAI_API_KEY` in Render environment variables.

## Final Submission Checklist

- Deploy the app and confirm the public URL loads.
- Launch BagSmith AI on Bags.
- Paste the live Bags project URL into the app and click **Save as launch proof**.
- Replace `TODO_REPLACE_WITH_LIVE_BAGS_PROJECT_URL` in `SUBMISSION.md`.
- Add the same Bags URL to DoraHacks coin/project details.
- Record the demo video showing the Bags launch proof link.
- Upload the code to GitHub.
