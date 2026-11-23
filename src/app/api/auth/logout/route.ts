import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Signed out successfully. Session revoked.",
  });

  // Clear HTTP-only session cookie
  response.cookies.set("lakeview_session", "", {
    path: "/",
    expires: new Date(0),
    httpOnly: true,
  });

  // Clear public identifier cookie
  response.cookies.set("lakeview_user_phone", "", {
    path: "/",
    expires: new Date(0),
  });

  return response;
}
