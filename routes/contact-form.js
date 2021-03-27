const express = require("express");
const nodemailer = require("nodemailer");
const {google} = require("googleapis");
const router = express.Router();

router.post("/send-email", (req,res) => {
    const {name, email, phone, service, message} = req.body;
    const contentHTML = `
    <div style= "background-color:  #112934; color: #fdf6e6; margin: 20px; padding:40px">
    <h1 style= "text-align: center; border-bottom: 2px solid #fdf6e6">Alguien quiere contactarnos.</h1>
    <ul style= "list-style: none;">
    <li style= "padding-top: 10px;"><b>Nombre:</b> ${name}</li>
    <li style= "padding-top: 10px;"><b>Correo:</b> ${email}</li>
    <li style= "padding-top: 10px;"><b>Numero celular:</b> ${phone}</li>
    <li style= "padding-top: 10px;"><b>Servicio:</b> ${service}</li>
    <li style= "padding-top: 10px;"><b>Descripción:</b><p style="margin-right:30px; border-bottom:2px solid #b70e21; margin-left:10px">${message}</p></li>
    </ul>
    `

    const CLIENT_ID = "908110287431-dvenc4k896lspgj85qjd159tlaij9f0s.apps.googleusercontent.com";
    const CLIENT_SECRET = "JNL6w2oboW8ZxPT8N2MPiB0f";
    const REDIRECT_URI = "https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN = 
        "1//04Bli_hVF31PPCgYIARAAGAQSNwF-L9IrXZ1eTQuLZ0EFgeTgVKtmlJ2Ir-oDkHS2V4thQMtLC7uRm5CKYtt_CMOX9MyZI78r1Y0"; 

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