const express = require("express");
const nodemailer = require("nodemailer");
const {google} = require("googleapis");
const router = express.Router();

router.post("/work-email", (req,res) => {
    const {name, email, phone, tel, city, work, message, page} = req.body;
    const contentHTML = `
    <div style= "background-color: #fdf6e6; color: #112934; margin: 20px; padding:40px">
    <h1 style= "text-align: center; border-bottom: 2px solid #112934">Alguien quiere trabajar con nosotros.</h1>
    <ul style= "list-style: none;">
    <li  style= "padding-top: 15px;"><b>Nombre:</b> ${name}</li>
    <li  style= "padding-top: 15px;"><b>Correo:</b> ${email}</li>
    <li  style= "padding-top: 15px;"><b>Número celular:</b> ${phone}</li>
    <li  style= "padding-top: 15px;"><b>Número telefónico:</b> ${tel}</li>
    <li  style= "padding-top: 15px;"><b>Ciudad de residencia:</b> ${city}</li>
    <li  style= "padding-top: 15px;"><b>Quiere trabajar como:</b> ${work}</li>
    <li  style= "padding-top: 15px;"><b>Descripción:</b><p style="margin-right:30px; border-bottom:2px solid #b70e21; margin-left:10px">${message}</p></li>
    <li  style= "padding-top: 15px;"><b>Hoja de vida:</b> ${page}</li>
    </ul>
    `

    const CLIENT_ID = "849293728348-eaum02bi7pdlmc796fm0gn9o4t4fou2d.apps.googleusercontent.com";
    const CLIENT_SECRET = "T2j1aNgjQujHCwLYd3TTgLGC";
    const REDIRECT_URI = "https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN = 
        "1//04IANSBgfgCHLCgYIARAAGAQSNwF-L9IrolOaBvHzvgiS70KrVTtqGdBD1VMQGA01qhq8i1bBuc1E1WQMsgOP8TsaQdSfAjsGOPc"; 

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
                subject: `${work}`,
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