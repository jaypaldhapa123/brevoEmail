import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/:email",async(req,res)=>{
    const toEmail = req.params.email;
    const api_key = process.env.API_KEY;
    const api_url=process.env.API_URL;

    const emailData = {

        sender: {
            name: "jaypal",
            email: process.env.SENDER_EMAIL
        },
    
        to: [
            {
                email:toEmail
            }
        ],
    
        subject: "testing brevo smtp",
    
        htmlContent: "<html> <body> <h1> Hello </h1> </body> </html>"
    
    };

    try{
        const response = await axios.post(api_url,emailData,{
            headers:{
                "Content-Type":"application/json",
                "api-key":api_key
            }
        });
        console.log(response);
        res.send("email send successfully")
    }catch(err){
        console.log(err);
        res.send("something went wrong")
    }


})


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})