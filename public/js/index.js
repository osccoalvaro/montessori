
import express from 'express';
import { z, ZodError } from 'zod';

//require('dotenv').config({path: './.env'});
import { config } from 'dotenv';
config({path: './.env'});

import sheets, { SHEET_ID } from './sheetClient.js';


const app = express();
const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email(),
  message: z.string().min(1, { message: 'Message is required' }),
  date: z.string(), // Agregar validación si es necesario

});

app.use(express.json());
app.use(express.static('public'));


/*
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
});*/

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
    res.status(200).json({ message: 'Data added successfully' }); // Devolver un código de estado 200
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(200).json({ message: 'Data added successfully' }); // Devolver un código de estado 200 incluso si ocurre un error
    }
  }
});


//app.listen(3000, () => console.log(`App running on http://localhost:3000`));


const puerto = process.env.PORT

app.listen(puerto,() => {
  console.log('http://localhost:3000')
})
