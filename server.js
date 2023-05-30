const express = require("express");
const mysql = require("mysql");

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  const subscriber = {
    email
  };

  connection.query('INSERT INTO subscribers SET ?', subscriber, (err, _result) => {
    if (err) {
      console.error('Error inserting subscriber:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Subscription successful!');
  });
});

app.post('/submissions', (req, res) => {
  const { name, subject, phonenumber, email, message } = req.body;

  const submission = {
    name,
    subject,
    phonenumber,
    email,
    message
  };

  connection.query('INSERT INTO submissions SET ?', submission, (err, _result) => {
    if (err) {
      console.error('Error inserting submission:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Form submission successful!');
  });
});



app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

app.use(express.static(__dirname))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});