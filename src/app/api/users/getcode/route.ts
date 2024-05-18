import { dbConnection } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getTokenData } from "@/helpers/getTokenData";
import { sendEmail } from "@/helpers/mailer";

dbConnection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    console.log(email);
    if (!email) {
      return NextResponse.json({ error: "Email is Required" }, { status: 400 });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User Not Found" }, { status: 400 });
    }

    await sendEmail({ email, emailType: "resetPassword", userId: user._id });

    return NextResponse.json({
      message: "Verification Code Sent",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
