import { dbConnection } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

dbConnection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { otp } = reqBody;

    const user = await User.findOne({
      verificationPassword: otp,
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    user.isVerfied = true;
    user.verificationPassword = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email Verified Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
