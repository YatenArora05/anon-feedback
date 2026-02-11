import { resend } from "../lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return {
        success: false,
        message: "Email service is not configured. Please contact support.",
        messages: [],
      };
    }

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Mystry Message | Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    if (error) {
      console.error("Resend API error:", error);
      return {
        success: false,
        message: error.message || "Failed to send verification email",
        messages: [],
      };
    }

    return {
      success: true,
      message: "Verification email sent successfully",
      messages: [],
    };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return {
      success: false,
      message: "Failed to send verification email",
      messages: [],
    };
  }
}
