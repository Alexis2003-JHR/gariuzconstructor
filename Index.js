const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine","ejs");
app.set("views",__dirname + "/views");

//Formulario.
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(require("./routes/Index.js"));

//General.
app.use(express.static(__dirname+"/public"));

app.get("/",(req,res)=>{
    res.render("Index",{titulo:""});
});

app.get("/Servicios",(req,res)=>{
    res.render("Servicios");
});

/*Nosotros*/
app.get("/Somos",(req,res)=>{
    res.render("Somos");
});
app.get("/Filosofia",(req,res)=>{
    res.render("Filosofia");
});
app.get("/Historia",(req,res)=>{
    res.render("Historia");
});
app.get("/Calidad-y-garantia",(req,res)=>{
    res.render("Calidad");
});


app.listen(port,()=>{
    console.log("Server",port,"running...");
})