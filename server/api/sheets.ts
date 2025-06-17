import { google } from 'googleapis'

export default defineEventHandler(async (event) => {
  try {
    // Initialize the Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // Replace with your Google Sheet ID
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    const range = 'Sheet1!A2:F' // Include column F (Opt-In)

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    })

    const rows = response.data.values || []

    // Only include rows where Opt-In (column F) is 'Yes'
    const people = rows
      .filter(row => (row[5] || '').toLowerCase() === 'yes')
      .map(row => ({
        name: row[0] || '',
        jobProfile: row[1] || '',
        jobFamily: row[2] || '',
        location: row[3] || '',
        linkedin: row[4] || '',
      }))

    return { people }
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch data from Google Sheets',
    })
  }
})