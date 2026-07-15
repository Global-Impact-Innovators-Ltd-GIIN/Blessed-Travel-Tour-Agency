import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

// Fetch all applications (for Superadmin panel review)
export async function GET() {
  try {
    const query = "SELECT id, company_name as \"companyName\", contact_person as \"contactPerson\", email, category, description, status, created_at as \"createdAt\" FROM bta_partner_applications ORDER BY created_at DESC";
    const { rows } = await pool.query(query);
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("Partners GET API Error:", error);
    return NextResponse.json(
      { error: "Internal server error fetching partner applications." },
      { status: 500 }
    );
  }
}

// Add a new partnership request
export async function POST(request: Request) {
  try {
    const { companyName, contactPerson, email, category, description } = await request.json();

    if (!companyName || !contactPerson || !email) {
      return NextResponse.json(
        { error: "Missing required company contact details." },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO bta_partner_applications (company_name, contact_person, email, category, description, status)
      VALUES ($1, $2, $3, $4, $5, 'Pending')
      RETURNING id, company_name as "companyName", contact_person as "contactPerson", email, category, description, status
    `;

    const { rows } = await pool.query(query, [
      companyName,
      contactPerson,
      email,
      category || "Airline Partner",
      description || ""
    ]);

    return NextResponse.json(rows[0]);
  } catch (error: any) {
    console.error("Partners POST API Error:", error);
    return NextResponse.json(
      { error: "Internal server error creating partner application." },
      { status: 500 }
    );
  }
}
