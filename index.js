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
app.use(express.static('public', { extensions: ['js'], mimeType: 'application/javascript' }));


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
    // let mailOptions = {
    //   from: "rutulkakadiya973@gmail.com",  // No-reply email set kiya
    //   to: "rajeshkakadiya973@gmail.com",  // Jo email receive karega
    //   subject: `${service} Inquiry`,  // Subject updated for insurance website
    //   html: `
    //     <p>Hello Team,</p>

    //     <p>You have received a new ${service} inquiry through the Plazer Associate website. Below are the details of the interested individual:</p>
    //     <hr>
    //     <p><b>Name:</b> ${name}</p>
    //     <p><b>Email:</b> ${email}</p>
    //     <p><b>Contact No:</b> ${countryCode} ${contactNo}</p>
    //     <p><b>Service Interested In:</b> ${service}</p>
    //     <p><b>Message:</b> ${message}</p>
    //   `,
    // };

    let mailOptions = {
      from: "rutulkakadiya973@gmail.com",  // No-reply email for professional touch
      to: "plazerassociates2015@gmail.com",  // Recipient email
      subject: `${service} Inquiry`,  // Subject updated for insurance website
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #212121;">
          <p>Hello Team,</p>
          <p>You have received a new <strong>${service}</strong> inquiry through the Plazer Associate website. Below are the details of the interested individual:</p>
          <hr style="border: 1px solid #D32F2F;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #D32F2F;">${email}</a></p>
          <p><strong>Contact No:</strong> ${countryCode} ${contactNo}</p>
          <p><strong>Service Interested In:</strong> ${service}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #F5F5F5; padding: 10px; border-left: 4px solid #D32F2F;">${message}</p>
          <hr style="border: 1px solid #D32F2F;">
          <p style="font-size: 14px; color: #555;">This is an automated email. Please do not reply.</p>
        </div>
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