import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

// Fetch active clients
export async function GET() {
  try {
    const query = "SELECT id, name, email, destination, active_step as \"activeStep\", passport_status as \"passportStatus\", invite_status as \"inviteStatus\", officer FROM bta_clients ORDER BY created_at DESC";
    const { rows } = await pool.query(query);
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("Clients GET API Error:", error);
    return NextResponse.json(
      { error: "Internal server error fetching clients." },
      { status: 500 }
    );
  }
}

// Update client case step or document states
export async function POST(request: Request) {
  try {
    const { id, activeStep, passportStatus, inviteStatus } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Client ID is required." },
        { status: 400 }
      );
    }

    // Build dynamic update query based on fields provided
    const fields: string[] = [];
    const values: any[] = [];
    let paramCounter = 1;

    if (activeStep !== undefined) {
      fields.push(`active_step = $${paramCounter++}`);
      values.push(activeStep);
    }
    if (passportStatus !== undefined) {
      fields.push(`passport_status = $${paramCounter++}`);
      values.push(passportStatus);
    }
    if (inviteStatus !== undefined) {
      fields.push(`invite_status = $${paramCounter++}`);
      values.push(inviteStatus);
    }

    if (fields.length === 0) {
      return NextResponse.json(
        { error: "No fields provided to update." },
        { status: 400 }
      );
    }

    values.push(id);
    const query = `
      UPDATE bta_clients 
      SET ${fields.join(", ")} 
      WHERE id = $${paramCounter} 
      RETURNING id, name, email, destination, active_step as "activeStep", passport_status as "passportStatus", invite_status as "inviteStatus", officer
    `;

    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Client record not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error: any) {
    console.error("Clients POST API Error:", error);
    return NextResponse.json(
      { error: "Internal server error updating client record." },
      { status: 500 }
    );
  }
}
