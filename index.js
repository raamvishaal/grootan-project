const express = require('express');
const app = express();
const csvtojson = require("csvtojson");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const postschema = require("./model");
require('dotenv/config');
const cors = require('cors');
app.use(cors())
upload = require("express-fileupload")
app.use(upload())

const postroute = require('./model');
app.use('/models', postroute)
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected'));
app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
app.post("/", async (req, res) => {
    if (req.files) {

        var file = req.files.filename,
            filename = file.name
        file.mv('./upload/' + filename, (err) => {
            if (err) {
                console.log(err)
                res.send("error")
            } else res.sendFile(__dirname + "/done.html")

        })
    }
    let data = await csvtojson().fromFile('./upload/' + filename)
    data.forEach(async item => {
        const newitem = new postschema(item)
        let { password } = item;
        if (password) {
            const encrypt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, encrypt);
            item.password = hashedPassword;
        }

        try {
            await newitem.save();
            console.log(`username - ${item.username} password - ${item.password}`);
        } catch (err) {
            console.log(err);
        }
    })
})



app.listen(3000, () => { console.log("server started") })