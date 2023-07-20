import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// credentials for mail
const host = process.env.MAIL_SMTP_ADDRESS;
const user = process.env.MAIL_ID;
const pass = process.env.MAIL_PASSWORD;

// mail transporter
const transporter = createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
});

// function to generate random 6 digit code
export function generateCode() {
  let code = "";
  let characters = "0123456789";
  for (let i = 0; i < 6; i++) {
    let randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}

// function to generate string for OTP message
function OTPmessage(to, name, otp) {
  const x = `<h1>Travera</h1>\n<h4>The Travel Dictionary</h4>\n<p>Hi, ${name}</p>\n<p>Your OTP is <b>${otp}</b></p>\n<p>Thanks, for joining us, please do not share this otp if not generated by you.</p>`;
  return x;
}

// function to an otp send mail
export async function sendMail(user, otp) {
  const message = OTPmessage(user.email, user.name, otp);
  try {
    const info = await transporter.sendMail({
      from: "Travera",
      to: user.email,
      subject: "OTP Verification",
      html: message,
    });
    return info.messageId;
  } catch (err) {
    console.log(err);
    throw new Error("Mail not send");
  }
}