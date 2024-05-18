import { dbConnection } from "@/dbConfig/dbConfig";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export async function DELETE(request: NextRequest) {
  try {
    const userId = await getTokenData(request);
    await User.findByIdAndDelete(userId);

    const response = NextResponse.json({
      message: "User Deleted Successfully",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
