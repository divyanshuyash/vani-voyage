import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, message } = data;

    // Define the path for the CSV file in the root of the project
    const filePath = path.join(process.cwd(), "leads.csv");

    // Check if the file exists to write the headers first
    const fileExists = fs.existsSync(filePath);

    // Escape quotes and commas in message to ensure valid CSV
    const safeMessage = message ? `"${message.replace(/"/g, '""')}"` : '""';
    const safeName = name ? `"${name.replace(/"/g, '""')}"` : '""';
    
    const timestamp = new Date().toISOString();
    const csvLine = `${timestamp},${safeName},${email},${phone},${safeMessage}\n`;

    if (!fileExists) {
      const headers = "Timestamp,Name,Email,Phone,Message\n";
      fs.writeFileSync(filePath, headers + csvLine, "utf8");
    } else {
      fs.appendFileSync(filePath, csvLine, "utf8");
    }

    return NextResponse.json({ success: true, message: "Lead saved successfully" });
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json({ success: false, message: "Failed to save lead" }, { status: 500 });
  }
}
