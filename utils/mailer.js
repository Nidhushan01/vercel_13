import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,  // Your email
    pass: process.env.EMAIL_PASSWORD  // App-specific password
  }
});

async function sendOTP(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}. It will expire in 5 minutes.`
  };

  await transporter.sendMail(mailOptions);
}

export default sendOTP;
