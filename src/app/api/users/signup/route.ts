import { dbConnection } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All Fields are Required" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User Already Registered" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPass });
    await newUser.save();

    await sendEmail({ email, emailType: "verification", userId: newUser._id });

    return NextResponse.json({
      message: "User Created Successfully",
      success: true,
      newUser,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
