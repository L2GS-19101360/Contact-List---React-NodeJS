var cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Welcome User to the Backend Server");
});

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, "../frontend/src/assets/contactimage")
    },
    filename: function (req, file, cb){
        return cb(null, `${file.originalname}`)
    }
});

const upload = multer({ storage });

app.post('/uploadfile', upload.single('file'), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    // Handle the file upload and send a response
    res.json({ message: 'File uploaded successfully' });
});

const contactRoutes = require('./src/routes/contacts.route');

app.use('/backend/contacts', contactRoutes);

app.listen(port, () => {
    console.log(`Backend Server is Listening on Port ${port}`);
});