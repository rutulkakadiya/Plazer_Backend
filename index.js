require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 5001;
;
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors({ 
  origin: ["http://demo.easywayitsolutions.com", "https://demo.easywayitsolutions.com"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));


app.use(express.json()); 



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


app.post("/send-email", async (req, res) => {
  
  const { name, email, contactNo, countryCode, service, message } = req.body;

  try {
    let mailOptions = {
      from: "rutulkakadiya973@gmail.com",  // No-reply email set kiya
      to: "plazerassociates2015@gmail.com",  // Jo email receive karega
      subject: "New Insurance Inquiry - Contact Form Submission",  // Subject updated for insurance website
      html: `
        <h2>New Inquiry from Insurance Website</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Contact No:</b> ${countryCode} ${contactNo}</p>
        <p><b>Service Interested In:</b> ${service}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Email not sent!", error });
  }
});

app.listen(port, (err) => {
  err ? console.log(err) : console.log("Server Started On Port : " + port);
})