import { dbConnect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

await dbConnect();

export async function POST(request: NextRequest) {
  const { username, password, email } = await request.json();
  console.log(username, password, email);
  //check for input params
  if (!username || !password || !email) {
    return NextResponse.json(
      {
        message: "Parameter is missing",
      },
      {
        status: 400,
      }
    );
  }
  //check if the user exists in db
  const user = await User.findOne({ email });
  if (user) {
    return NextResponse.json(
      {
        message: "User already exists!",
      },
      { status: 400 }
    );
  }
  const duplicateUser = await User.findOne({ username });
  if (duplicateUser) {
    return NextResponse.json(
      {
        message: "Username already taken",
      },
      { status: 400 }
    );
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  const saveUser = await newUser.save();
  console.log(saveUser);
  return NextResponse.json(
    {
      message: "User created successfully!",
      user: saveUser,
    },
    { status: 201 }
  );
}
