import { dbConnection } from "@/dbConfig/dbConfig";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
dbConnection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;
    console.log(reqBody);

    const userId = await getTokenData(request);

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User Not Found" }, { status: 400 });
    }

    if (username) user.username = username;
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPass = await bcryptjs.hash(password, salt);
      user.password = hashedPass;
    }

    await user.save();

    return NextResponse.json({
      message: "User Updated Successfully",
      success: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
