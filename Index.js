const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine","ejs");
app.set("views",__dirname + "/views");

//Formulario.
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(require("./routes/index.js"));

//General.
app.use(express.static(__dirname+"/public"));

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/servicios",(req,res)=>{
    res.render("servicios");
});

/*Nosotros*/
app.get("/somos",(req,res)=>{
    res.render("somos");
});
app.get("/historia",(req,res)=>{
    res.render("historia");
});
app.get("/calidad-y-garantia",(req,res)=>{
    res.render("calidad");
});


app.listen(port,() => {
    console.log("Server",port,"running...");
})