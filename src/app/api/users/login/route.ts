import { dbConnect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request: NextRequest) {
  const reqbody = await request.json();
  const { email, password } = reqbody;
  if (!email || !password) {
    return NextResponse.json(
      {
        message: "Parameter is missing!",
      },
      { status: 400 }
    );
  }
  //find the username in the db
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      {
        message: "User doesn't exists!",
      },
      { status: 404 }
    );
  }
  //Check for valid password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return NextResponse.json(
      {
        message: "Email and password doesn't match!",
      },
      { status: 400 }
    );
  }
  //create token data
  const tokenData = {
    id: user._id,
    username: user.username,
    email: user.email,
  };
  //create token
  const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
    expiresIn: "1d",
  });
  //create custom response
  const response = NextResponse.json(
    {
      message: "LoggedIn successfully!",
    },
    { status: 200 }
  );
  response.cookies.set("token", token, {
    httpOnly: true,
  });

  return response;
}
