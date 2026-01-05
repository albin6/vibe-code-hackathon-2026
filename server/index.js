const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { google } = require("googleapis");

dotenv.config();

const PORT = process.env.PORT || 4001;
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME || "Sheet1";
const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
let PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
if (PRIVATE_KEY) PRIVATE_KEY = PRIVATE_KEY.replace(/\\n/g, "\n");

if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
  console.warn("Google Sheets env vars are not fully configured. The API will return 500 until set.");
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.post("/sheets", async (req, res) => {
  try {
    const payload = req.body;

    if (!payload || !Array.isArray(payload.participants)) {
      return res.status(400).json({ error: "Invalid payload. Expected { participants: [...] }" });
    }

    if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
      return res.status(500).json({ error: "Server not configured with Google Sheets credentials" });
    }

    const jwtClient = new google.auth.JWT({
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    await jwtClient.authorize();

    const sheets = google.sheets({ version: "v4", auth: jwtClient });

    const rows = [];
    const teamSize = payload.participants.length;
    const timestamp = new Date().toISOString();

    for (let i = 0; i < payload.participants.length; i++) {
      const p = payload.participants[i];
      rows.push([
        timestamp,
        teamSize,
        i + 1,
        i === 0 ? "Captain" : "Member",
        p.fullName || "",
        p.age || "",
        p.gender || "",
        p.primaryPhone || "",
        p.secondaryPhone || "",
      ]);
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:Z`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: rows },
    });

    return res.json({ ok: true, appended: rows.length });
  } catch (err) {
    console.error("/sheets error:", err && err.message ? err.message : err);
    return res.status(500).json({ error: err && err.message ? err.message : "Unknown error" });
  }
});

app.listen(PORT, () => {
  console.log(`Sheets API listening on http://localhost:${PORT}`);
});