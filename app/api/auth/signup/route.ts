import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

export async function POST(request: Request) {
  try {
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All account fields are required." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const checkQuery = "SELECT email FROM bta_users WHERE email = $1 LIMIT 1";
    const checkResult = await pool.query(checkQuery, [email]);
    if (checkResult.rows.length > 0) {
      return NextResponse.json(
        { error: "An account with this email address already exists." },
        { status: 409 }
      );
    }

    // Insert user
    const insertQuery = `
      INSERT INTO bta_users (email, password, name, role) 
      VALUES ($1, $2, $3, $4) 
      RETURNING email, name, role
    `;
    const resolvedRole = role || "client";
    const { rows } = await pool.query(insertQuery, [email, password, name, resolvedRole]);

    // If registered as a client, automatically create a consular pipeline record in bta_clients
    if (resolvedRole === "client") {
      const clientId = "BTA-" + Math.floor(Math.random() * 900 + 100) + "-KGL";
      await pool.query(`
        INSERT INTO bta_clients (id, name, email, destination, active_step, passport_status, invite_status, officer)
        VALUES ($1, $2, $3, 'Kigali, Rwanda', 1, 'Pending', 'Pending', 'Keza Agasaro')
      `, [clientId, name, email]);
    }

    return NextResponse.json({
      success: true,
      user: rows[0]
    });
  } catch (error: any) {
    console.error("Signup API Error:", error);
    return NextResponse.json(
      { error: "Internal server error during registration." },
      { status: 500 }
    );
  }
}
