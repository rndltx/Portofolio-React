import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { compare } from 'bcrypt';

interface AdminUser {
  id: number;
  username: string;
  password: string;
  last_login: Date;
}

export async function POST(request: Request) {
  const { username, password } = await request.json();

  try {
    // Get user by username only first
    const results = await query<AdminUser[]>(
      'SELECT * FROM admin_users_rizsign WHERE username = ?',
      [username]
    );

    if (results.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid credentials' 
      }, { status: 401 });
    }

    const user = results[0];

    // Compare password hash
    const isValid = await compare(password, user.password);

    if (!isValid) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid credentials' 
      }, { status: 401 });
    }

    // Update last login
    await query(
      'UPDATE admin_users_rizsign SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Create session
    const session = {
      id: user.id,
      username: user.username,
      isLoggedIn: true,
      loginTime: new Date()
    };

    return NextResponse.json({ 
      success: true, 
      message: 'Login successful',
      session 
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'An error occurred' 
    }, { status: 500 });
  }
}

