var cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Welcome User to the Backend Server");
});

const contactRoutes = require('./src/routes/contacts.route');

app.use('/backend/contacts', contactRoutes);

app.listen(port, () => {
    console.log(`Backend Server is Listening on Port ${port}`);
});