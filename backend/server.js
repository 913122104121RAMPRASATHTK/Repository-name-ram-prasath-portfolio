const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


// ---------- Gmail Transporter ----------

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// ---------- Test Route ----------

app.get("/", (req, res) => {

    res.json({
        message: "Portfolio backend is running"
    });

});


// ---------- Contact Form ----------

app.post("/api/contact", async (req, res) => {

    const {
        name,
        email,
        phone,
        message
    } = req.body;


    console.log("Contact Form Data:");

    console.log({
        name,
        email,
        phone,
        message
    });


    try {

        const mailOptions = {

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            replyTo: email,

            subject: `Portfolio Contact - ${name}`,

            text: `
New Contact Form Submission

Name:
${name}

Email:
${email}

Phone:
${phone}

Message:
${message}
            `
        };


        await transporter.sendMail(mailOptions);


        console.log("Email sent successfully!");


        res.status(200).json({

            success: true,

            message: "Message sent successfully"

        });


    } catch (error) {

    console.error("Email sending error:", error.message);

    console.error(
        "EMAIL_USER exists:",
        !!process.env.EMAIL_USER
    );

    console.error(
        "EMAIL_PASS exists:",
        !!process.env.EMAIL_PASS
    );

    res.status(500).json({
        success: false,
        message: "Failed to send message"
    });
}

});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});