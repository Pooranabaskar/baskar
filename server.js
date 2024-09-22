const { google } = require('googleapis');
const fs = require('fs');

// Load client secrets from a local file.
const CREDENTIALS_PATH = 'sample.json'; // replace with the path to your downloaded JSON file

// The ID and range of the spreadsheet.
const SPREADSHEET_ID = '1u5b_lvfhdUAaecbZTOzzAJ8gc2P3JMRUe4ooZQ4xy-o'; // replace with your actual spreadsheet ID
const SHEET_NAME = 'Sheet1'; // replace with your actual sheet name if different


async function addRow(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  const values = [
    ['rockzzz', 'rockzz@gmail.com',"6789"],
    ['deva','deva@gmail.com',"546778"]
  ];
  const resource = {
    values,
  };
  try {
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:C`,
      valueInputOption: 'RAW',
      resource,
    });
    console.log(`${result.data.updates.updatedCells} cells appended.`);
  } catch (err) {
    console.error('Error appending data: ', err);
  }
}

function authorize() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_email, private_key } = credentials;
  const jwtClient = new google.auth.JWT(
    client_email,
    null,
    private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );
  jwtClient.authorize((err, tokens) => {
    if (err) {
      console.error('Error authorizing client: ', err);
      return;
    }
    addRow(jwtClient);
  });
}

authorize();