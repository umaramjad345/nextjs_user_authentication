import nodemailer from "nodemailer";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    console.log(email, emailType, userId);

    if (emailType === "verification") {
      await User.findByIdAndUpdate(userId, {
        verificationPassword: otp,
      });
    } else if (emailType === "resetPassword") {
      await User.findByIdAndUpdate(userId, {
        resetPassword: otp,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const mailOptions = {
      from: "umarziaii@gmail.com",
      to: email,
      subject:
        emailType === "verification"
          ? "Verification Password"
          : "Reset Password OTP",
      html: `<p>Your ${
        emailType === "verification"
          ? "Verification Password"
          : "Reset Password OTP"
      } is <h1> ${otp} </h1></p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
