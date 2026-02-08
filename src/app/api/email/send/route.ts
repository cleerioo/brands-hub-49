
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    const { orderId, email, items, amount } = await req.json();

    if (!process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
        console.warn("Email credentials not found in env vars. Skipping email send.");
        return NextResponse.json({ message: "Email skipped (no credentials)" });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
        port: Number(process.env.EMAIL_SERVER_PORT) || 587,
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"Amazon Clone" <${process.env.EMAIL_SERVER_USER}>`,
        to: email,
        subject: `Order Confirmation - ${orderId}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #232f3e;">Thanks for your order!</h1>
                <p>Hello,</p>
                <p>We've received your order <strong>${orderId}</strong>.</p>
                
                <h2 style="border-bottom: 1px solid #ccc; padding-bottom: 5px;">Order Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background-color: #f3f3f3;">
                        <th style="padding: 10px; text-align: left;">Item</th>
                        <th style="padding: 10px; text-align: right;">Price</th>
                    </tr>
                    ${items.map((item: any) => `
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">
                                ${item.title} x ${item.quantity || 1}
                            </td>
                            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">
                                ₹${item.price}
                            </td>
                        </tr>
                    `).join('')}
                </table>
                
                <h3 style="text-align: right; margin-top: 20px;">Total: ₹${amount}</h3>
                
                <p style="margin-top: 30px; font-size: 12px; color: #777;">
                    This is a demo email from Amazon Clone.
                </p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
