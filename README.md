# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

## Google Sheets Server API (local setup)

This project includes a small server endpoint that appends registration rows to a Google Sheet using a service account.

1. Create a Google Cloud Service Account with the **Editor** role on the target spreadsheet and obtain the JSON key. Grant the service account access to the spreadsheet (Share > add service account email).

2. Copy the needed env vars into `.env` (create from `.env.example`):

- `GOOGLE_SHEETS_CLIENT_EMAIL` — service account email
- `GOOGLE_SHEETS_PRIVATE_KEY` — the private key from the JSON (replace newlines with `\n` when placing into the env file)
- `SPREADSHEET_ID` — the ID part from the sheet URL
- `SHEET_NAME` — the sheet/tab name (defaults to `Sheet1`)

3. Start the API server for local development:

```sh
# install deps if needed
npm i

# Run the API with ts-node-dev (auto-reload)
npm run dev:api:ts
```

The server exposes:

- `GET /health` – simple health check
- `POST /sheets` – expects `{ participants: [ ... ] }` and appends rows to the configured sheet

4. In development, the frontend calls the API at `VITE_API_URL` (default `http://localhost:4001`). You can set `VITE_API_URL` in your `.env` or `.env.local`.

Security note: never commit service account keys to source control; use environment variables or a secret manager in production.
