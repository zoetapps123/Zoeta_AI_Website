import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { businessName, personName, email, location, query } = await req.json();

    if (!businessName || !personName || !email || !query) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Zoeta AI Website" <${process.env.GMAIL_USER}>`,
      to: "zoetapps123@gmail.com",
      replyTo: email,
      subject: `New Query from ${personName} - ${businessName}`,
      html: `
        <h2>New Contact Query</h2>
        <p><strong>Business:</strong> ${businessName}</p>
        <p><strong>Name:</strong> ${personName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Location:</strong> ${location || "Not provided"}</p>
        <hr />
        <p><strong>Query:</strong></p>
        <p>${query.replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
