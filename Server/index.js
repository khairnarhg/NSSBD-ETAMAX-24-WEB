const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connection = require('./database');

const app = express();

app.use(bodyParser.json());

// Route for handling registration
app.post('/api/register', async (req, res) => {
  const { fullName, rollNo, email, phoneNumber, branch, nssYear, selectedSlot } = req.body;

  // Insert registration data into volunteers table
  try {
    await connection.query(
      'INSERT INTO volunteers (fullName, rollNo, email, phoneNumber, branch, nssYear, selectedSlot) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [fullName, rollNo, email, phoneNumber, branch, nssYear, selectedSlot]
    );
  } catch (error) {
    console.error('Error inserting into database:', error);
    return res.status(500).json({ error: 'An error occurred while registering the volunteer.' });
  }

  console.log('Volunteer registered successfully!');
  res.status(200).json({ message: 'Volunteer registered successfully!' });
});

// Route for updating slot counts
app.post('/api/slotCounts', async (req, res) => {
  const { slotNumber, count } = req.body;

  // Update slot count in the SlotCounts table
  try {
    await connection.query(
      'INSERT INTO slotcounts (slotNumber, count) VALUES (?, ?) ON DUPLICATE KEY UPDATE count = VALUES(count)',
      [slotNumber, count]
    );
  } catch (error) {
    console.error('Error updating slot counts:', error);
    return res.status(500).json({ error: 'An error occurred while updating slot counts.' });
  }

  console.log('Slot counts updated successfully!');
  res.status(200).json({ message: 'Slot counts updated successfully.' });
});

// Route for retrieving slot counts
app.get('/api/slotCounts', async (req, res) => {
  try {
    const [slotCounts] = await connection.query('SELECT * FROM slotcounts');
    res.status(200).json(slotCounts);
  } catch (error) {
    console.error('Error retrieving slot counts:', error);
    res.status(500).json({ error: 'An error occurred while retrieving slot counts.' });
  }
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to database');
  });
});
