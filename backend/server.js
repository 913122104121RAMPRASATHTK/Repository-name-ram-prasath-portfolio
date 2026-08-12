const express = require("express");
const cors = require("cors")
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Portfolio backend is running"
    });
});

app.post("/api/contact", (req, res) => {
    const {name, email, phone, message} = req.body;
    console.log("Contact Form Data:");
    console.log({
        name,
        email,
        phone,
        message
    });

    res.json({
        success: true,
        message: "Message received Successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})