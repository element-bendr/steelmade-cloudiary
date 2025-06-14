import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs'; // Add this line

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Create a nodemailer transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // your Gmail address from environment variables
        pass: process.env.GMAIL_PASS, // your Gmail app password from environment variables
      },
    });

    // Configure the email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // send to yourself
      subject: `New Contact Form Submission from ${name}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, info });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
    return NextResponse.json({ success: false, error: 'An unknown error occurred' });
  }
}
