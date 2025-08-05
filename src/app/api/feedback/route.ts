import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userQuery, botResponse, timestamp } = body;

    // Validate the request
    if (!botResponse || !timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the data for Google Sheets
    const values = [
      [
        new Date(timestamp).toISOString(),
        userQuery || 'N/A',
        botResponse,
      ],
    ];

    // Append the data to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:C', // Assumes headers are: Timestamp, User Query, Bot Response
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    // Log detailed error information
    console.error('Error logging feedback. Details:', {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      spreadsheetId: SPREADSHEET_ID,
      hasAuth: !!auth,
      hasPrivateKey: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
      hasClientEmail: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL
    });
    return NextResponse.json(
      { error: 'Failed to log feedback', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
