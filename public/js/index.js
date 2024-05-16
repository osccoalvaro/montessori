import express from 'express';
import { z, ZodError } from 'zod';
import sheets, { SHEET_ID } from './sheetClient.js';
import { config } from 'dotenv';
config({ path: './.env' });

const app = express();
app.use(express.json());
app.use(express.static('public'));

const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email(),
  message: z.string().min(1, { message: 'Message is required' }),
  date: z.string(), // Agregar validación si es necesario
});

app.post('/send-message', async (req, res) => {

  try {
    const body = contactFormSchema.parse(req.body);
    // Object to Sheets
    const rows = Object.values(body);
    console.log(rows);
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Data!A:D', // Asegúrate de tener suficientes columnas para la fecha
      insertDataOption: 'INSERT_ROWS',
      valueInputOption: 'RAW',
      requestBody: {
        values: [rows],
      },
    });
    res.json({ message: 'Data added successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error });
    }
  }

});

app.listen(process.env.PORT, () => {
  console.log('Server running in port http://localhost:3000')
});