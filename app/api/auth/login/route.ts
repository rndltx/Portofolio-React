import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { compare } from 'bcrypt';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://www.rizsign.com, https://rizsign.com',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': '86400'
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders
  });
}

interface AdminUser {
  id: number;
  username: string;
  password: string;
  last_login: Date;
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Get user by username
    const results = await query<AdminUser[]>(
      'SELECT * FROM admin_users_rizsign WHERE username = ?',
      [username]
    );

    if (results.length === 0) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Invalid credentials' }), 
        { status: 401, headers: corsHeaders }
      );
    }

    const user = results[0];
    const isValid = await compare(password, user.password);

    if (!isValid) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Invalid credentials' }), 
        { status: 401, headers: corsHeaders }
      );
    }

    await query(
      'UPDATE admin_users_rizsign SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    const session = {
      id: user.id,
      username: user.username,
      isLoggedIn: true,
      loginTime: new Date()
    };

    return new NextResponse(
      JSON.stringify({ success: true, message: 'Login successful', session }), 
      { 
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Login error:', error);
    return new NextResponse(
      JSON.stringify({ success: false, message: 'An error occurred' }), 
      { 
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

