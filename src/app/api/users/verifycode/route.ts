import { dbConnection } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

dbConnection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { code } = reqBody;

    const user = await User.findOne({
      resetPassword: code,
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid Code" }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(otp, salt);
    user.password = hashedPass;
    await user.save();

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b4b1584e37c7e6",
        pass: "8dcfcc51e5ad4d",
      },
    });

    const mailOptions = {
      from: "umarziaii@gmail.com",
      to: user.email,
      subject: "OTP",
      html: `<p>Your OTP is <h1> ${otp} </h1> . Please reset your password as soon as possible</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);

    return NextResponse.json({
      message: "OTP Sent to Your Email",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
