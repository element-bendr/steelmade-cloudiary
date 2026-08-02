import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body || typeof body !== 'object') {
       return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }
    
    const { name, email, message } = body;
    
    if (!name || typeof name !== 'string' || name.length > 200) {
       return NextResponse.json({ success: false, error: 'Invalid name' }, { status: 400 });
    }
    
    // Simple email regex for API validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email) || email.length > 200) {
       return NextResponse.json({ success: false, error: 'Invalid email' }, { status: 400 });
    }
    
    if (!message || typeof message !== 'string' || message.length > 5000) {
       return NextResponse.json({ success: false, error: 'Invalid message' }, { status: 400 });
    }

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
    await transporter.sendMail(mailOptions);

    // Return simple success to avoid leaking mail transport data
    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error: unknown) {
    // Log error internally but return generic response to client
    console.error('Contact form submission failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
