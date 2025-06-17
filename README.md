# NextStep: Derivkin Community Support App

This Nuxt 3 app helps recruiters and hiring managers connect with Derivco employees affected by retrenchment. It displays a live, filterable list of people who have opted in to be listed, pulling data directly from a Google Spreadsheet.

## How It Works

- **Data Source:**
  - The app fetches data from a Google Sheet using the Google Sheets API.
  - Only rows where the "Opt-In" column (column F) is set to `Yes` are displayed.
  - The spreadsheet columns are:
    1. Name
    2. Job Profile
    3. Job Family
    4. Location
    5. LinkedIn
    6. Opt-In (must be `Yes` to show)

- **Backend:**
  - The API endpoint (`/api/sheets`) authenticates with a Google Service Account and fetches the spreadsheet data.
  - Credentials are stored securely as environment variables and never exposed to the frontend.

- **Frontend:**
  - The main page fetches the list of people from the API and displays them in a searchable, filterable table.
  - Users can filter by Job Family, Job Profile, and Location.

## Setup & Deployment

1. **Google Cloud Setup:**
   - Create a Google Cloud project and enable the Google Sheets API.
   - Create a Service Account and download the credentials JSON.
   - Share your Google Sheet with the Service Account's email (Viewer access).

2. **Environment Variables:**
   - Set the following in your `.env` (do NOT commit this file):
     - `GOOGLE_SHEET_ID` — The ID from your sheet URL.
     - `GOOGLE_CLIENT_EMAIL` — From your service account JSON.
     - `GOOGLE_PRIVATE_KEY` — From your service account JSON (multiline supported).

3. **Netlify Deployment:**
   - Add the above environment variables in your Netlify site settings (Build & Deploy > Environment).
   - Deploy your site. The backend will securely access the spreadsheet.

## Security
- Sensitive credentials are never exposed to the frontend or committed to the repo.
- Only people who have opted in ("Opt-In" = Yes) are shown.

## Customization
- To change the spreadsheet, update the `GOOGLE_SHEET_ID` and share the new sheet with your service account.
- To change which columns are displayed, update the API and frontend code accordingly.

---

*This is a community project and not an official Derivco initiative.*
