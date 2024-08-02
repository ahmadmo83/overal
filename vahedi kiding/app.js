const { name } = require("ejs");
const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.set("view engine", 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    fs.readFile('public/data.json', 'utf8', (err, data) => {
        if (err) throw err;
        const news = JSON.parse(data);
        res.render("../news.ejs", {list: news});
    });
});

app.post('/', upload.single('image'), (req, res) => {
    const { title, description } = req.body;
    const image = req.file.filename;

    const news = { title, description, image };
    fs.readFile('public/data.json', 'utf8', (err, data) => {
        const dataOld = JSON.parse(data);
        dataOld.push(news);
        fs.writeFile('public/data.json', JSON.stringify(dataOld), (err) => {
            if (err) throw err;
            console.log('خبر با موفقیت ذخیره شد!');
            res.redirect("/");
        });
    });
});

app.listen(3000, () => {
    console.log("listen in port 3000");
});