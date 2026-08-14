const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

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

        const { data, error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: [process.env.EMAIL_TO],
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
        });

        if (error) {
            console.error("Resend Error:", error);

            return res.status(500).json({
                success: false,
                message: "Failed to send message"
            });
        }

        console.log("Email sent successfully!", data);

        res.status(200).json({
            success: true,
            message: "Message sent successfully"
        });

    } catch (error) {

        console.error("Email sending error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to send message"
        });
    }
});

// ---------- Start Server ----------

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});