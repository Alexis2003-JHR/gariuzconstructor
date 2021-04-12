const express = require("express");
const nodemailer = require("nodemailer");
const {google} = require("googleapis");
const router = express.Router();

router.post("/send-email", (req,res) => {
    const {name, email, phone, service, message} = req.body;
    const contentHTML = `
    <div style= "background-color: #112934; color: #fdf6e6;">
    <h1 style= "background-color: #fdf6e6; color: #112934; text-align: center; font-size: 30px; padding: 50px 0; border: 2px solid #112934">
    Alguien quiere contactarnos</h1>

    <ul style= "list-style: none;">

    <li style= "margin-top: 15px; font-size: 15px; text-align: center">
    <b>Nombre:<br></b>${name}<br><br></li>

    <li style= "margin-top: 15px; font-size: 15px; text-align: center">
    <b>Correo:<br></b>${email}<br><br></li>

    <li style= "margin-top: 15px; font-size: 15px; text-align: center">
    <b>Numero celular:<br></b>${phone}<br><br></li>

    <li style= "margin-top: 15px; font-size: 15px; text-align: center">
    <b>Servicio:<br></b>${service}<br><br></li>

    <li style= "margin-top: 15px; font-size: 15px; text-align: center"">
    <b>Descripción:<br></b><p style="margin-right:30px; border-bottom:2px solid #b70e21; margin-left:10px">
    ${message}<br><br></p></li>

    </ul>
    `

    const CLIENT_ID = "908110287431-dvenc4k896lspgj85qjd159tlaij9f0s.apps.googleusercontent.com";
    const CLIENT_SECRET = "JNL6w2oboW8ZxPT8N2MPiB0f";
    const REDIRECT_URI = "https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN = 
        "1//04b5otmkt7Z5pCgYIARAAGAQSNwF-L9Irskp4vwjQdegyzS9H4Tqe3_eU_NFqO3--VAB1cwl3NY6MSkH6Or3MS1VfAOiytuiIq4I"; 

    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

    oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN });

    async function sendMail(){
        
        try{
            const accessToken = await oAuth2Client.getAccessToken();
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth:{
                    type: "OAuth2",
                    user: "gariuzemails@gmail.com",
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken,
                },
            });
            const mailOptions = {
                from: "Contacto Gariuz emails.",
                to: "gariuzconstructor11@gmail.com",
                subject: `${service}`,
                html: contentHTML,
            };

            const result = await transporter.sendMail(mailOptions);
            return result;

        }catch(err){
            console.log(err);
        }
    }
    sendMail()
        .then((result) => res.redirect("/Sucess.html"))
        .catch((error) => console.log(error.message));
});

module.exports = router;