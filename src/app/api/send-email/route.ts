import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { type, name, email, contactNumber, country, message, packageDetails, customTripDetails } = await request.json();

    if (!type || !name || !email || !contactNumber || !country) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    let subject = '';
    let text = '';

    switch (type) {
      case 'contact':
        subject = `Contact Form Message from ${name}`;
        text = `
Name: ${name}
Email: ${email}
Contact Number: ${contactNumber}
Country: ${country}
Message: ${message}
        `;
        break;

      case 'package':
        subject = `Package Booking Request from ${name}`;
        text = `
Name: ${name}
Email: ${email}
Contact Number: ${contactNumber}
Country: ${country}
Package Details: ${JSON.stringify(packageDetails, null, 2)}
        `;
        break;

      case 'customTrip':
        subject = `Custom Trip Request from ${name}`;
        text = `
Name: ${name}
Email: ${email}
Contact Number: ${contactNumber}
Country: ${country}
Custom Trip Details: ${JSON.stringify(customTripDetails, null, 2)}
        `;
        break;

      default:
        subject = `Form Submission from ${name}`;
        text = `
Name: ${name}
Email: ${email}
Contact Number: ${contactNumber}
Country: ${country}
Message: ${message || 'N/A'}
        `;
    }

    await transporter.sendMail({
      from: email,
      to: 'thusharadilrukshatd@gmail.com',
      subject,
      text,
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
