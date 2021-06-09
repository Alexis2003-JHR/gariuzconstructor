const express = require("express");
const nodemailer = require("nodemailer");
const {google} = require("googleapis");
const router = express.Router();

router.post("/work-email", (req,res) => {
    const {name, email, phone, tel, city, work, message, page} = req.body;
    const contentHTML = `
    <div style= "background-color: #fdf6e6; color: #112934;">
    <h1 style= "background-color: #112934; color: #fdf6e6; text-align: center; font-size: 30px; padding: 80px 0;">
    Alguien quiere trabajar con nosotros</h1>
    <ul style= "list-style: none;">

    <li  style= "margin-top: 15px; font-size: 15px; text-align: center">
        <b>Nombre:<br></b> ${name}<br><br></li>

    <li  style= "margin-top: 15px; font-size: 15px; text-align: center">
        <b>Correo:<br></b> ${email}<br><br></li>
        
    <li  style= "margin-top: 15px; font-size: 15px; text-align: center">
        <b>Número celular:<br></b> ${phone}<br><br></li>

    <li  style= "margin-top: 15px; font-size: 15px; text-align: center">
        <b>Número telefónico:<br></b> ${tel}<br><br></li>

    <li  style= "margin-top: 15px; font-size: 15px; text-align: center">
        <b>Ciudad de residencia:<br></b> ${city}<br><br></li>

    <li  style= "margin-top: 15px; font-size: 15px; text-align: center">
        <b>Quiere trabajar como:<br></b> ${work}<br><br></li>

    <li  style= "margin-top: 15px; font-size: 15px; text-align: center">
        <b>Descripción:<br></b><p style="margin-right:30px; border-bottom:2px solid #b70e21; margin-left:10px">${message}<br><br></p></li>
    
    <li  style= "margin-top: 15px; font-size: 15px; text-align: center">
        <b>Hoja de vida:<br></b> ${page}<br><br></li>
    </ul>
    `

    const CLIENT_ID = "849293728348-eaum02bi7pdlmc796fm0gn9o4t4fou2d.apps.googleusercontent.com";
    const CLIENT_SECRET = "T2j1aNgjQujHCwLYd3TTgLGC";
    const REDIRECT_URI = "https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN = 
        "1//04rcOhUPj82FkCgYIARAAGAQSNwF-L9IroY5ZP68y4JoaLQ7d13iV0bF3OyAGTEwPS3h592PaKjxVG8M56LTeHsedtDYyMxIMk3c"; 

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