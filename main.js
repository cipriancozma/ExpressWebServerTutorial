const express = require("express");

const app = express();
const path =require("path");
const port = 3000;

app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));

const getInfo = (req, res, next) => {
    req.infoAboutRabbit = false;
    if(req.infoAboutRabbit){
        res.send("Please come back when we have info about this rabbit!")
    } else {
        next();
    }
}

app.get('/', getInfo, ((req, res) => {
    res.render("home", {
        withInfo: req.infoAboutRabbit,
        rabbits:
            [{name: "Andrew", species: "white rabbit"}, {name: "Garry", species: "black rabbit"}]
    })
}))

app.get('/about', ((req, res) => {
    res.send("Welcome to about page!");
}))

app.post("/result", (req, res) => {
    if(req.body.rabbit.trim().toUpperCase() === "BUGS BUNNY") {
        res.send("That is correct!");
   } else {
       res.send("Please try again! It is not correct!");
   }
})

app.get("/api/rabbits", (req, res) => {
    res.json( [
        {name: "Andrew", species: "white rabbit"},
        {name: "Garry", species: "black rabbit"}
        ])
})

app.listen(port);