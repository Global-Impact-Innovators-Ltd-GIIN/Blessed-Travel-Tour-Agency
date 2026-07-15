import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

// Fetch all transmissions
export async function GET() {
  try {
    const query = "SELECT id, client_name as \"clientName\", client_id as \"clientId\", partner, documents, status, date FROM bta_dispatches ORDER BY created_at DESC";
    const { rows } = await pool.query(query);
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("Dispatches GET API Error:", error);
    return NextResponse.json(
      { error: "Internal server error fetching dispatches." },
      { status: 500 }
    );
  }
}

// Add a new dossier dispatch
export async function POST(request: Request) {
  try {
    const { id, clientName, clientId, partner, documents, status, date } = await request.json();

    if (!id || !clientName || !clientId || !partner) {
      return NextResponse.json(
        { error: "Missing required dossier parameters." },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO bta_dispatches (id, client_name, client_id, partner, documents, status, date)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, client_name as "clientName", client_id as "clientId", partner, documents, status, date
    `;

    const { rows } = await pool.query(query, [
      id,
      clientName,
      clientId,
      partner,
      documents || [],
      status || "Submitted to Partner",
      date
    ]);

    return NextResponse.json(rows[0]);
  } catch (error: any) {
    console.error("Dispatches POST API Error:", error);
    return NextResponse.json(
      { error: "Internal server error creating dispatch." },
      { status: 500 }
    );
  }
}

// Update dispatch status (simulate embassy reviews)
export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Dispatch ID and status are required." },
        { status: 400 }
      );
    }

    const query = `
      UPDATE bta_dispatches 
      SET status = $1 
      WHERE id = $2 
      RETURNING id, client_name as "clientName", client_id as "clientId", partner, documents, status, date
    `;

    const { rows } = await pool.query(query, [status, id]);

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Transmission record not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error: any) {
    console.error("Dispatches PATCH API Error:", error);
    return NextResponse.json(
      { error: "Internal server error updating transmission." },
      { status: 500 }
    );
  }
}
