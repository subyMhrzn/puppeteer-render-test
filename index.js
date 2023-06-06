const express = require("express");
const {scrapeLogic} = require("./scrapeLogic");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", (req,res) => {
    scrapeLogic(res);
});

// app.get("/", (req,res) => {
//     res.send("Render Puppeteer server is up and running");
// });


app.listen(PORT,() => {
    console.log(`listening on port ${PORT}`);
});